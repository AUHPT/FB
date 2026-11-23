# Shared saving setup (one time, about 5 minutes)

Shared saving keeps every menu change in a Google Sheet on your Google account. Whoever opens Menu Studio next, on any computer, continues from the latest saved menu. Every save is also kept as a version, so the team can go back to an earlier one under **⋯ › Version history**.

## 1. Create the script

1. Go to **https://script.google.com** and sign in with the Google account that should own the saves. A shared hotel account is best.
2. Click **New project**. Rename it to **Menu Studio saves**.
3. Delete the sample code. Paste in everything from `Code.gs` in this folder.
4. Near the top, change `TEAM_PASSCODE = 'change-me'` to the passcode you'll give the F&B team.
5. Save (💾).

## 2. Create the sheet and allow access

1. In the toolbar, choose the function **setup**, then click **▶ Run**.
2. Google asks for permission. Click **Review permissions**, choose your account, then **Advanced › Go to Menu Studio saves › Allow**.
3. The run creates a Google Sheet called **Menu Studio · shared saves (do not edit)** in your Drive. Don't edit or rename its tabs.

## 3. Publish it as a web app

1. Click **Deploy › New deployment**.
2. Click the ⚙ next to "Select type" and choose **Web app**.
3. Set **Execute as** to **Me**, and **Who has access** to **Anyone**.
4. Click **Deploy** and copy the **Web app URL**. It ends in `/exec`.

## 4. Connect Menu Studio

In the GitHub repo, open **config.json** and click ✏️ to edit it. Paste the URL between the quotes:

```json
{
  "sharedSaveUrl": "https://script.google.com/macros/s/XXXXXXXX/exec"
}
```

Commit the change. A minute later the site starts using shared saving. You don't need to rebuild.

## How it works for the team

- The first time someone saves on a computer, they enter their name and the team passcode. It's remembered after that.
- The status in the top bar shows **Saved for everyone** once a change reaches the shared sheet.
  - If the internet drops, it shows **Offline — saved on this computer** and uploads automatically when the connection is back.
- Open menus pick up colleagues' saves automatically, within about a minute or when the window is focused.
- If two people change the same menu at the same time, the second person is asked which version to keep. The other version stays in Version history.
- **⋯ › Version history** lists every save with the person's name and time. **Restore** brings back any earlier version.

## Changing things later

- **Change the passcode:** edit `TEAM_PASSCODE` in the script, then **Deploy › Manage deployments › ✏️ › Version: New version › Deploy**. The URL stays the same. Everyone is asked for the new passcode on their next save.
- **Changed `Code.gs` for any other reason:** redeploy the same way, with *New version* on the existing deployment, so the URL doesn't change.
- **The sheet** is also a backup: every row in the *History* tab is a full copy of a menu.

Anyone who has the web app URL can read the menus. Changes need the passcode.
