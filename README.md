
# Node-RED Moderate

## Sample Case

* Use scope variables to store data between a node with `flow`
* Read any data from a website by scraping
* Make tunnel to provide custom `DNS` with `ngrok` and `localtunnel`
* Email sending with `Sendgrid`
* Call external node process with `exec`
* Connect `AirVisual` API for AQI data
* Find a current `IP` (public and private)
* Communicate between flow with `MQTT`
* Receive GPS data from `Blynk` and send notifications to the device

---

## Predefined Config

| Name                   |     Value      | Remark |
| :--------------------- | :------------: | -----: |
| TZ                     |  Asia/Bangkok  |        |
| AIRVISUAL_CITY         |    Bang Na     |        |
| AIRVISUAL_STATE        |    Bangkok     |        |
| AIRVISUAL_COUNTRY      |    Thailand    |        |
| AIRVISUAL_KEY          |    `token`     |        |
| NGROK_ENABLE           |     false      |        |
| NGROK_REGION           |       ap       |        |
| NGROK_PROTO            |      http      |        |
| NGROK_PORT             |      1880      |        |
| NGROK_AUTH             |    `string`    |        |
| NGROK_TOKEN            |    `token`     |        |
| SENDGRID_API_KEY       |    `token`     |        |
| SENDGRID_FROM          |    `email`     |        |
| SENDGRID_TO            | `Array<email>` |        |
| LOCALTUNNEL_ENABLE     |     false      |        |
| LOCALTUNNEL_HOST       |    `string`    |        |
| LOCALTUNNEL_PORT       |      1880      |        |
| LOCALTUNNEL_SUB_DOMAIN |    `string`    |        |

---
