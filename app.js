const express = require("express");
const os = require("os");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const networkInterfaces = os.networkInterfaces();
    let ipAddress = "Not Found";

    for (let interfaceName in networkInterfaces) {
        for (let iface of networkInterfaces[interfaceName]) {
            if (iface.family === "IPv4" && !iface.internal) {
                ipAddress = iface.address;
                break;
            }
        }
    }

    res.send(`Server IP: ${ipAddress}`);
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
