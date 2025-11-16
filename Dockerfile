FROM nginx:alpine

# Copy dashboard files
COPY dash /usr/share/nginx/html/

# Copy profile configurations
COPY profiles /usr/share/nginx/html/profiles/

# Copy data directory if present (optional)
# Note: This will be mounted as a volume in docker-compose
RUN mkdir -p /usr/share/nginx/html/data

# Copy custom nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Use custom entrypoint
ENTRYPOINT ["/entrypoint.sh"]
