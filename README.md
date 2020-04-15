<p align="center">
  <a href="http://lovera.maxam.now.sh/">
    <img src="https://cultofthepartyparrot.com/parrots/hd/parrot.gif" alt="Logo" height="80">
  </a>
  <h3 align="center">📌✨productive-box</h3>
  <p align="center">
    Are you an early 🐤 or a night 🦉?
    <br/>
    Let's check out in gist !
</p>

---

> This project is inspired by an awesome pinned-gist project.<br/>Find more in https://github.com/matchai/awesome-pinned-gists

## Setup

### Prep work
1. Create a new public GitHub Gist (https://gist.github.com/)
2. Create a token with the `gist` scope and copy it. (https://github.com/settings/tokens/new)

### Project setup

1. Fork this repo
2. Edit the [environment variable](https://github.com/maxam2017/productive-box/blob/master/.github/workflows/schedule.yml#L16-L17) in `.github/workflows/schedule.yml`:

   - **GIST_ID:** The ID portion from your gist url: `https://gist.github.com/maxam2017/`**`9842e074b8ee46aef76fd0d493bae0ed`**.

3. Go to the repo **Settings > Secrets**
4. Add the following environment variables:
   - **GH_TOKEN:** The GitHub token generated above.

