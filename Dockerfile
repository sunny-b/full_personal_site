FROM phusion/passenger-ruby23:0.9.33

ENV HOME /root

CMD ["/sbin/my_init"]

RUN rm -f /etc/service/nginx/down
RUN rm /etc/nginx/sites-enabled/default

ADD nginx/personalSite.conf /etc/nginx/sites-enabled/personalSite.conf

RUN mkdir /home/app/personalSite

WORKDIR /tmp
COPY app/Gemfile /tmp/
COPY app/Gemfile.lock /tmp/
RUN bundle install

COPY app /home/app/personalSite
RUN chown -R app:app /home/app

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
