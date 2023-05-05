FROM mcr.microsoft.com/playwright:v1.33.0-jammy
USER root

ENV HOME /playwright-for-studies

WORKDIR ${HOME}
COPY . ${HOME}
COPY . .env

RUN yarn install

CMD [ "yarn", "test:e2e" ]
