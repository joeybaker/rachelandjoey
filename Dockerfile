# rachelandjoey
#
# VERSION               1.0.0

FROM      dockerfile/nodejs
MAINTAINER Joey Baker <joey@byjoeybaker.com>

RUN npm install -g nave
RUN nave usemain stable

# Bundle app source
ADD . /src
# Install app dependencies
RUN cd /src; npm install --production


EXPOSE 8000
CMD ["node", "/src/index.js"]
