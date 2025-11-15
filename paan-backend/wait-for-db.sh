#!/bin/bash
set -e

host="$1"
shift
cmd="$@"

echo "Waiting for MySQL at $host:3306..."

until mysql -h"$host" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SELECT 1" &> /dev/null; do
  echo "MySQL is unavailable - sleeping"
  sleep 5
done

echo "MySQL is up - executing command"
exec $cmd
