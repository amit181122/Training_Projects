const express = require('express');

const admin = require("firebase-admin");

const port = process.env.PORT || 3001;

const app = express();

const serviceAccount ={
    type:"service_account",
project_id:"fitbitsix-d1493",
private_key_id:"8702a35aa84499d7d9e632243905e83dd6f83f06",
private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD0I60UCLqsCpZS\n8FlFApuke3Y818Kqw2q+aOdzAGZF2kEifhik7HzHKGMixlzBtvInUHhi+Y35HvcJ\nWlq0d363ruvjiWRMV5qz+mNZsQfdAcB8MynhpKRZfJyZ1P392coTixMtPCBjcXC/\n0UDAbeepxV0u1IqnmMDL3b3LK1iIb1BczvzSTujdw8S1bTLy09gmUPtnZSQEXwzI\nFmtghnbxp83B6NAb59eOBWU+NPYlEeQhcwp0cDrrW7zxf5WoQ/WMoI6RQBrSxasW\nNIK03MljpysIb7PxICtRIDsK1/mu6PVGkMeBdlVBY1Ec4dGvRIw3x74EVT8HEhmh\nr6kqQENJAgMBAAECggEABy7EBTB/Dnf2xXynAbPikJ+lwkM+SdAbRDwZoB1pROGX\nlDxVvQdsod7fMMsZeEUJwYyZaB8LtWI69iJbhA72clDCBaUZh3H13hjuIpnF35OR\nPk4yi54QjEXxZQi6SsVFL9dCAo0P7mEMZkZRo3+wRsNE2y97X1QsCutsja1KKuRd\nyOSt6YCj6Vxs0hXanipMmgW56CL5Q+W25dZ9YDQkjwnDJTBoiaLlq6Nzl/6wlEcO\n7L8sE0+xNv28latNr/4LdMnzTyTxotXfeLJTTL+UGnXxJ3hxfXrmqDAMjcmCt4ze\n7dO4X0gRkN4IPd7eIHmOwsGJQEm0dwQ0fJt1H4RnUQKBgQD67BNWflQlFrq8lnjC\nD8KbdeDob8IARMhsM3DL4wjmSXDVcY5wkQIw3QUUBgQrGmnaEe4CCniFOWv2/ydY\nwgokEz7KVMCoctQvCeXkupPjftMD9Afeze4oITCXJxjAR3mrEhjKUT6/h/1n8Si5\nKC+VxDgtrX/XUkd0eBM695df2QKBgQD5FHYrcMR0vr394SjkVEhaAW9FMJQzBIQd\nwreNTtofKcpOLHbjk+8nQl6rnFy7DAhBUca+wtsT0oFY2q0qDmh+h9mL7bsS4AAM\ndgUpaT+B7abpgIB3hvRSaCdwQ2Z3SLg745/Pg8V88AmBBkRXGbyWrnjPJZkLIpZu\nr02AG9pI8QKBgHbogu19JkEBOXL/V7CXKWDkhrV/qI7aCaSE6BImv+Ppr6fmjVq4\nzTH8u1hW1Yjblof58TFUZvKzWH+PQMUmBwo7eIkHitkIuZak+SXgaQ7o3fTEoyop\nqo+n0s/+fhM4i+bOx6Kwx6yaNDMarHK6IXq2puy2iJuwaR4/fNV32WtZAoGBALcj\nt1trd9eLI/EW69Uur2AWa/UIqf71FBs5v3JUBwcg2BIwmV3tuMs5/pfZyUjyqOM2\nOJaseR6TCe4GI4qnu2dFhcxgCMvxDbgb0uHG9B4ZWj+X711zShOJZ24g8KdGPcgz\nLp8K+VtKtwI6VGdikgqM0GEm+Od6D/fkR2ypjg9RAoGBAKqZLw/9jf4cYyBjOdd+\nNIo3Ruc9+o+EliiDD97WybkzwIZfbXYQbLJRPliGrVTzEuat9wwy/G9UtDA/dytt\n+1+E8Hez7oAvbt32wh/Twb7mGwJ5bllo5t5WgnvlShtpyBt7K3bULT6qKhwMB1xt\ndrIqKZkZZNC2reubKyI9/0Wg\n-----END PRIVATE KEY-----\n",
"client_email":"firebase-adminsdk-cnlv5@fitbitsix-d1493.iam.gserviceaccount.com",
"client_id":"113042355031735494861",
"auth_uri=https":"accounts.google.com/o/oauth2/auth",
"token_uri=https":"oauth2.googleapis.com/token",
"auth_provider_x509_cert_url=https":"www.googleapis.com/oauth2/v1/certs",
"client_x509_cert_url=https":"www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cnlv5%40fitbitsix-d1493.iam.gserviceaccount.com"

}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const token = 'fcZarnalRDG1hwxhUhJRmN:APA91bGYKztSsa3_kM0fM6ZM8d_O6jiTeP--NuBFy3NJYaxb70dTFD19D6EzYGGOelCTNxKbObPH9-DwdmEPS07Ul-7L18nbCDZbriBcY9MRsZXqMZ9aBOQHvGMHWJpELWUN0jc2IfHM'

const payload = {
    notification: {
        title: "This is a notification",
        body: "This is the body of the notification"
    }
}

const options = {
    priority: "high",
    timeToLive: 60*60*24
}

admin.messaging().sendToDevice(token, payload, options)
.then(function(response){
    console.log("successfully sent message:",JSON.stringify( response))
})
.catch(function(error){
    console.log("Error sending message:", error)
})

//server connecting
app.listen(port, () => {
    console.log('listening on port ', port);
})