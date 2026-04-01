FROM nginx:alpine
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
# Copy SSL certificates
COPY certs /etc/nginx/certs
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
