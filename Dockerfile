# FROM node:18-alpine
FROM jekyll/jekyll

WORKDIR /app

# Copy package files first for better caching
COPY ./* ./

# Debug - list what's in the container
RUN ls -la

EXPOSE 3009

CMD ["jekyll", "build"]
CMD ["jekyll", "serve"]