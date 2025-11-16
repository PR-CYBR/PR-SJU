#!/bin/sh
set -e

# Inject DEFAULT_PROFILE into hamdash.html if set
if [ -n "$DEFAULT_PROFILE" ]; then
  echo "Setting DEFAULT_PROFILE to: $DEFAULT_PROFILE"
  
  # Create a small script tag to inject the environment variable
  ENV_SCRIPT="<script>window.DEFAULT_PROFILE = '$DEFAULT_PROFILE';</script>"
  
  # Insert before the closing </head> tag in hamdash.html
  sed -i "s|</head>|$ENV_SCRIPT\n</head>|" /usr/share/nginx/html/hamdash.html
fi

# Start nginx
exec nginx -g 'daemon off;'
