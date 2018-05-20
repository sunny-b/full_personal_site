FROM ruby:2.2

RUN apt-get update -yqq \
  && apt-get install -yqq --no-install-recommends

WORKDIR /usr/src/app
COPY Gemfile* ./
RUN bundle install
COPY . .

EXPOSE 3000
CMD bundle exec puma -t 5:5 -p ${PORT:-3000}
