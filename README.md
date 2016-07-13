# Facebook Messenger Token Verification

A function to handle token verifications of the Facebook Messenger Platform format.

## Setup

```sh
cp config-sample.js config.js
# edit config.js to replace YOUR_VERIFY_TOKEN with another string
```

## Build an "AWS Lambda"-ready zip file to upload

```sh
npm install
npm build
npm zip:lambda
```

## Setup AWS

- Upload the ```lambda.zip``` file to your aws lambda and
- configure an API Gateway trigger with
    - security public (Auth NONE)
    - and the "Method Request passthrough" template as a Body Mapping integration for content-type application/json

![lambda management console 2016-07-13 20-17-41](https://cloud.githubusercontent.com/assets/7760/16823153/46c50878-4938-11e6-92c4-3810bce29498.png)

![api gateway 2016-07-13 20-21-03](https://cloud.githubusercontent.com/assets/7760/16823157/4b1cbc04-4938-11e6-8c05-d459f2d0a606.png)

![api gateway 2016-07-13 20-25-05](https://cloud.githubusercontent.com/assets/7760/16823160/4f85661a-4938-11e6-8876-493203f7c77e.png)
