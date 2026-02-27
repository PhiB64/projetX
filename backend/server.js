import { env } from "./src/config/env";

import app from "./src/app";

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});