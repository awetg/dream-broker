[![Build Status](https://travis-ci.org/awetg/dream-broker.svg?branch=master)](https://travis-ci.org/awetg/dream-broker)


# DreamBroker Challenge

## Overview
This project is implementation of DreamBroker code challeng. The challenge to implement and deploy API endpoint. As proof of concept only a single API endpoint is implemented. The project includes integration test and auto deployment to Heroku. You can test the app using curl on your terminal. [App URL](https://dream-broker.herokuapp.com/) (https://dream-broker.herokuapp.com/)



---
## Project Requirements

* Implement an API endpoint to anaylze text, deploy it somewhere and provide a URL for testing

Request example

```console
    curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"text":"hello 2 times  "}' \
    https://mysuperawesomeapi.com/analyze
```
    
Response example

```json
{
    "textLength":{"withSpaces":15,"withoutSpaces":11},
    "wordCount":3,
    "characterCount":[{"e":2},{"h":1},{"i":1},{"l":2},{"m":1},{"o":1},{"s":1},{"t":1}]
}
```

* Characters array should contain only English letters and they should be alphabetically ordered

---

## Getting started

To get the Node server running locally.

Clone repo

```sh
git clone https://github.com/awetg/dream-broker.git
```

Install dependecy
```sh
cd dream-broker & npm install
```

Start server
```sh
node index.js
```

Your app should now be running on [localhost:3000](http://localhost:3000/)
