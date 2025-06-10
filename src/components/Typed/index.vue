<template>
    <div :class="`chat-text chat-text-${compId}`"></div>
</template>

<script>
import Typed from "typed.js";

export default {
    name: "chat-text",
    props: {
        html: {
            type: String,
            default: "",
        },
        speed: {
            type: Number,
            default: 12,
        },
    },
    data() {
        return {
            compId: this.randomString(10),
        };
    },
    watch: {
        // html(newVal, oldVal) {
        //     if (newVal !== oldVal) {
        //         this.render();
        //     }
        // }
    },
    mounted() {
        // this.render();
    },
    methods: {
        randomString(len) {
            const chars =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let result = "";
            for (let i = 0; i < len; i++) {
                result += chars.charAt(
                    Math.floor(Math.random() * chars.length)
                );
            }
            return result;
        },
        render() {
            let _this = this;
            new Typed(`.chat-text-${this.compId}`, {
                strings: [this.html],
                typeSpeed: this.speed,
                showCursor: false,
                /**
                 * Before it begins typing
                 * @param {Typed} self
                 */
                onBegin: () => {},
                /**
                 * All typing is complete
                 * @param {Typed} self
                 */
                onComplete: () => {
                    setTimeout(() => {
                        _this.$emit("complete");
                    }, 100);
                },
            });
        },
    },
};
</script>

