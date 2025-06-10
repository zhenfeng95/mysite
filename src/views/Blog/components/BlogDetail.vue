<template>
    <div class="blog-detail-container">
        <h1>{{ blog.title }}</h1>
        <div class="aside">
            <span>日期: {{ formatDate(blog.createDate) }}</span>
            <span>浏览: {{ blog.scanNumber }}</span>
            <a href="#data-form-container">评论: {{ blog.commentNumber }}</a>
            <RouterLink
                :to="{
          name: 'CategoryBlog',
          params: {
            categoryId: blog.category.id,
          },
        }"
            >{{ blog.category.name }}</RouterLink>
        </div>
        <div v-html="htmlContent" class="markdown-body"></div>
    </div>
</template>

<script>
import { formatDate } from "@/utils";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import "@/styles/markdown.css";

// 初始化 markdown-it + highlight.js
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true, // Convert '\n' in paragraphs into <br>
    // highlight: function (str, lang) {
    //     if (lang && hljs.getLanguage(lang)) {
    //         try {
    //             return `<pre class="hljs"><code>${
    //                 hljs.highlight(str, { language: lang }).value
    //             }</code></pre>`;
    //         } catch (__) {}
    //     }

    //     // 没有指定语言或不支持，使用默认转义
    //     return `<pre class="hljs"><code>${md.utils.escapeHtml(
    //         str
    //     )}</code></pre>`;
    // },
});
export default {
    props: {
        blog: {
            type: Object,
            required: true,
        },
    },
    methods: {
        formatDate,
    },
    computed: {
        htmlContent() {
            return md.render(this.blog.htmlContent);
        },
    },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.aside {
    font-size: 12px;
    color: @gray;
    span,
    a {
        margin-right: 15px;
    }
}
.markdown-body {
    margin: 2em 0;
}
</style>

