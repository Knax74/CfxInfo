const axios = require("axios");

class CfxInfo {
  constructor(serverCode) {
    if (!serverCode) throw new Error("Please provide a server code.");
    this.serverCode = serverCode;
    this.apiUrl = `https://servers-frontend.fivem.net/api/servers/single/${serverCode}`;
  }

  async #fetchData() {
    try {
      const response = await axios.get(this.apiUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; CfxInfo/1.0; +https://github.com/Knax74/CfxInfo)",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  async GetPlayerCount() {
    const data = await this.#fetchData();
    return data?.Data?.clients ?? 0;
  }
  async GetResourceCount() {
    const data = await this.#fetchData();
    return data?.Data?.resources?.length ?? 0;
  }

  async GetBuildVersion() {
    const data = await this.#fetchData();
    return data?.Data?.vars?.sv_enforceGameBuild ?? "N/A";
  }
}

module.exports = CfxInfo;
