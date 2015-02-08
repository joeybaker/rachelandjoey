# rachelandjoey
#
# VERSION               2.0.0

FROM      iojs:1.1.0
MAINTAINER Joey Baker <joey@byjoeybaker.com>

# Bundle app source
ADD . /src
# Install app dependencies
RUN cd /src; npm install --production


EXPOSE 8000
WORKDIR "/src"
CMD ["npm", "start"]
