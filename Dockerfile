FROM ruby:3.2-slim

WORKDIR /app

# Install dependencies
RUN apt-get update && \
    apt-get install -y build-essential && \
    rm -rf /var/lib/apt/lists/*

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install Ruby dependencies
RUN bundle install

# Copy the rest of the application
COPY . .

# Build the Jekyll site
RUN bundle exec jekyll build

# Expose port 3009 (matching docker-compose.yml)
EXPOSE 3009

# Start Jekyll server
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "3009"] 