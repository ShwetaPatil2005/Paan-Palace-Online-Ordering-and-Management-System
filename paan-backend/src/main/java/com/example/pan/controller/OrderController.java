package com.example.pan.controller;

import com.example.pan.model.Order;
import com.example.pan.model.OrderItem;
import com.example.pan.security.JwtService;
import com.example.pan.service.OrderService;
import com.example.pan.service.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.pan.model.ErrorResponse;
import com.example.pan.model.SuccessResponse;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    @Autowired
    private JwtService jwtService;

    @GetMapping
    public List<Order> getAll() {
        return orderService.getAllOrders();
    }

    @PostMapping
    public ResponseEntity<Object> place(@RequestBody OrderRequest orderRequest, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String email = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            email = jwtService.extractEmail(token);
        } else {
            return new ResponseEntity<>(new ErrorResponse("Authorization token missing"), HttpStatus.UNAUTHORIZED);
        }

        if (orderRequest.getItems() == null || orderRequest.getItems().isEmpty()) {
            return new ResponseEntity<>(new ErrorResponse("Order must have at least one item"), HttpStatus.BAD_REQUEST);
        }

        // Validate items
        for (OrderItemRequest item : orderRequest.getItems()) {
            if (!productService.existsById(item.getProductId())) {
                return new ResponseEntity<>(new ErrorResponse("Product with ID " + item.getProductId() + " not found"), HttpStatus.NOT_FOUND);
            }
            if (item.getQuantity() <= 0) {
                return new ResponseEntity<>(new ErrorResponse("Quantity for product ID " + item.getProductId() + " must be positive"), HttpStatus.BAD_REQUEST);
            }
        }

        // Create Order entity
        Order order = new Order();
        order.setCustomerName(orderRequest.getCustomerName());
        order.setCustomerEmail(email);
        order.setAddress(orderRequest.getAddress());
        order.setTotalPrice(orderRequest.getTotalPrice());
        order.setQuantity(orderRequest.getQuantity());
        order.setStatus("Pending");
        order.setOrderTime(System.currentTimeMillis());

        // Convert items
        List<OrderItem> items = orderRequest.getItems().stream()
                .map(item -> {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setProductId(item.getProductId());
                    orderItem.setQuantity(item.getQuantity());
                    return orderItem;
                })
                .toList();
        order.setItems(items);

        orderService.placeOrder(order, token);

        return new ResponseEntity<>(new SuccessResponse("Order placed successfully"), HttpStatus.CREATED);
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<String> confirmOrder(@PathVariable Long id, HttpServletRequest request) {
        Order order = orderService.getOrderById(id);
        if (order == null) {
            return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
        }

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String email = jwtService.extractEmail(token);
            order.setCustomerEmail(email);
        }

        order.setStatus("Confirmed");
        orderService.saveOrder(order);
        return new ResponseEntity<>("Order confirmed", HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        boolean isDeleted = orderService.deleteOrder(id);
        if (isDeleted) {
            return new ResponseEntity<>("Order deleted successfully", HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> get(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        if (order == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}

class OrderRequest {
    private String customerName;
    private String address;
    private Double totalPrice;
    private int quantity;
    private List<OrderItemRequest> items;

    // Getters and setters
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public List<OrderItemRequest> getItems() { return items; }
    public void setItems(List<OrderItemRequest> items) { this.items = items; }
}

class OrderItemRequest {
    private Long productId;
    private int quantity;

    // Getters and setters
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}