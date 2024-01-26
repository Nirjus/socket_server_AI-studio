import { server } from "./app";
import { port } from "./secret/secret";


server.listen(port, () => {
    console.log(`socket server running on http://localhost:${port}`);
})