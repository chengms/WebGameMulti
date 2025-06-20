# 游戏配置模板 (game-template.md)

这是一个用于向游戏平台添加新游戏的模板。请将新游戏的信息添加到 `games/games-config.txt` 文件中。

## 格式说明

每一行代表一个游戏，字段之间使用 `|` 分隔。

**格式:**
`ID|名称|描述|类型|URL/路径|缩略图|本地图标|标签|作者|优先级`

**字段说明:**

| 字段 | 说明 | 示例 (本地游戏) | 示例 (在线游戏) |
|---|---|---|---|
| `ID` | 游戏的唯一标识符，只能使用小写字母、数字和连字符 `-`。这将用于URL，例如 `/game/your-game-id`。 | `my-cool-game` | `awesome-online-game` |
| `名称` | 游戏的显示名称。 | `My Cool Game` | `Awesome Online Game` |
| `描述` | 游戏的简短描述，会显示在游戏卡片上。 | `A fun game about jumping.` | `An amazing online multiplayer game.` |
| `类型` | 游戏类型，必须是 `local` 或 `online`。`local` 表示游戏文件在 `games/` 目录下；`online` 表示游戏在外部服务器上。 | `local` | `online` |
| `URL/路径` | 如果是 `local` 游戏，这里是游戏 `index.html` 的相对路径。如果是 `online` 游戏，这里是完整的URL。 | `/games/my-cool-game/index.html` | `https://example.com/online-game/` |
| `缩略图` | 游戏封面的**主要**图片路径。对于在线游戏，这通常是一个URL。 | `/games/my-cool-game/image/cover.png` | `https://example.com/cover.png` |
| `本地图标` | **备用**的本地图标路径。当在线`缩略图`加载失败时会使用此图标。对于本地游戏，此字段通常与`缩略图`字段相同。如果留空，将使用默认占位图。 | `/games/my-cool-game/image/cover.png` | `/placeholder-game.png` |
| `标签` | 游戏的分类标签，多个标签用逗号 `,` 分隔。 | `Puzzle,Strategy,Brain` | `Multiplayer,Action,Real-time` |
| `作者` | 游戏的开发者或发行商。 | `GameDev Inc.` | `Online Entertainment` |
| `优先级` | 一个数字，用于排序。数字越大，游戏在列表中的位置越靠前。 | `10` | `20` |

---

## 模板示例

### 本地游戏模板

*   **步骤:**
    1.  将您的游戏文件放到一个新的文件夹中，例如 `games/my-cool-game/`。
    2.  确保游戏文件夹里有 `index.html` 和一个包含 `cover.png` 的 `image` 文件夹。
    3.  复制下面这行模板，修改信息，然后粘贴到 `games/games-config.txt` 的末尾。

```
# 本地游戏示例
new-local-game|New Local Game|Description of your new local game.|local|/games/new-local-game/index.html|/games/new-local-game/image/cover.png|/games/new-local-game/image/cover.png|Local,Single-player|Your Studio|15
```

### 在线游戏模板

*   **步骤:**
    1.  复制下面这行模板，修改信息，然后粘贴到 `games/games-config.txt` 的末尾。
    2.  确保URL是有效的。如果在线图标加载失败，将使用本地备用图标。

```
# 在线游戏示例
new-online-game|New Online Game|Description of an external online game.|online|https://some-game-url.com/play|https://some-image-url.com/cover.jpg|/placeholder-game.png|Online,Multiplayer|External Developer|25
``` 