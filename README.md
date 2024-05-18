> [!CAUTION]
> If you upgrade to v1.1.5+, please remember to:
>
> 1. move the **GIST ID** to the Secret
> 2. move the **TIMEZONE** to the Repository variable
>    For details, refer to the third point in [Project Setup](https://github.com/maxam2017/productive-box/tree/master?tab=readme-ov-file#project-setup).
>
> p.s. when you see this notice in the README of your forked repository, it means you have upgraded to v1.1.5

<p align="center">
  <a href="http://lovera.maxam.now.sh/">
    <img src="https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png" alt="screenshot" width="500">
  </a>
  <h3 align="center">📌✨productive-box</h3>
</p>

<p align="center">
   <img src="https://img.shields.io/badge/language-typescript-blue?style"/>
   <img src="https://img.shields.io/github/license/maxam2017/productive-box"/>
   <img src="https://img.shields.io/github/stars/maxam2017/productive-box"/>
   <img src="https://img.shields.io/github/forks/maxam2017/productive-box"/>
</p>
<p align="center">
   Are you an early 🐤 or a night 🦉?
   <br/>
   When are you most productive during the day?
   <br/>
   Let's check out in gist!
</p>

---

> This project is inspired by an awesome pinned-gist project.<br/>
> Find more in https://github.com/matchai/awesome-pinned-gists

## Overview

This project uses GitHub graphQL API to get the commit histories and write into the gist by [rest.js](https://github.com/octokit/rest.js#readme)

## Setup

### Prep work

1. Create a new public GitHub Gist (https://gist.github.com/)
1. Create a token with the `gist` and `repo` scope and copy it. (https://github.com/settings/tokens/new)
   > enable `repo` scope seems **DANGEROUS**<br/>
   > but this GitHub Action only accesses your commit timestamp in the repositories you contributed.

### Project setup

1. Fork this repo
1. Open the "Actions" tab of your fork and click the "enable" button
1. Go to the repo **Settings > Secrets and variables** > **Actions**,
   add the following secrets / variables:
   | Type | Name | Description |
   |---------------------------------|--------------------|---------------------------------------------------------------|
   | Repository Secrets | **GH_TOKEN** | The GitHub token generated above. |
   | Repository Secrets | **GIST_ID** | The ID portion from your gist URL, e.g., `9842e074b8ee46aef76fd0d493bae0ed`. |
   | Repository Variable | **TIMEZONE** | The timezone of your location, e.g., `Asia/Taipei` for Taiwan, `America/New_York` for America in New York, etc. |

   Below is the final screenshot: (Click the image for a clearer view.)

   |Repository Secret|Repository Variable|
   |:-:|:-:|
   |<img width="500" alt="" src="https://github.com/maxam2017/productive-box/assets/25841814/53a1ddfa-17f3-40c0-b8db-afd674d616e6">|<img width="500" src="https://github.com/maxam2017/productive-box/assets/25841814/836f8374-ae13-4617-9e18-62ed3eb8e179">|
1. Manually run the workflow for the first time or wait for the scheduled run. (The workflow will run every day at 00:00 UTC.)
1. [Pin the newly created Gist](https://help.github.com/en/github/setting-up-and-managing-your-github-profile/pinning-items-to-your-profile)

### How to run the workflow manually
1. Go to the "Actions" tab on your fork
1. Select the "Update gist" workflow
1. Click the "Run workflow" button
