# 音频资源存放目录

请把你已经下载好的背景音乐文件放到这里，命名为：

```
public/audio/bgm.mp3
```

Vite 会在打包时把 `public/` 目录下的所有文件原样复制到构建产物（`dist/`）根目录，
所以代码里直接用 `/audio/bgm.mp3` 这个绝对路径引用即可，本地开发和生产部署都不需要
额外配置——这也是"后期上 CI/CD pipeline 很方便"的原因：它就是一个静态文件，跟着
`vite build` 自动打包进去，不涉及任何后端/服务器改动。

如果你的文件不是 mp3 格式（比如 wav / ogg / m4a），把 `src/utils/audio.ts` 里的
`BGM_SRC` 常量后缀改一下即可。

