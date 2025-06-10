<template>
    <div class="carousel-item-container" ref="container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
        <div class="carousel-img" ref="image" :style="imagePosition">
            <ImageLoader @load="this.showWords" :src="carousel.bigImg" :placeholder="carousel.midImg" />
        </div>
        <div class="title">
            <typed ref="firstTyped" :html="carousel.title" :speed="50" @complete="fnFirstComplete"></typed>
        </div>
        <div class="desc">
            <typed ref="secondTyped" :html="carousel.description" :speed="50"></typed>
        </div>
    </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
import Typed from "@/components/Typed";
export default {
    props: ["carousel"],
    components: {
        ImageLoader,
        Typed,
    },
    data() {
        return {
            containerSize: null, // 外层容器的尺寸
            innerSize: null, // 里层图片的尺寸
            mouseX: 0, // 鼠标的横坐标
            mouseY: 0, // 鼠标的纵坐标
        };
    },
    computed: {
        //得到图片坐标
        imagePosition() {
            if (!this.innerSize || !this.containerSize) {
                return;
            }
            const extraWidth = this.innerSize.width - this.containerSize.width; // 多出的宽度
            const extraHeight =
                this.innerSize.height - this.containerSize.height; //多出的高度
            const left = (-extraWidth / this.containerSize.width) * this.mouseX;
            const top =
                (-extraHeight / this.containerSize.height) * this.mouseY;
            return {
                transform: `translate(${left}px, ${top}px)`,
            };
        },
        center() {
            return {
                x: this.containerSize.width / 2,
                y: this.containerSize.height / 2,
            };
        },
    },
    mounted() {
        this.setSize();
        this.mouseX = this.center.x;
        this.mouseY = this.center.y;
        window.addEventListener("resize", this.setSize);
    },
    destroyed() {
        window.removeEventListener("resize", this.setSize);
    },
    methods: {
        // 调用该方法，显示文字
        showWords() {
            this.$nextTick(() => {
                this.$refs.firstTyped.render();
            });
        },
        setSize() {
            this.containerSize = {
                width: this.$refs.container.clientWidth,
                height: this.$refs.container.clientHeight,
            };

            this.innerSize = {
                width: this.$refs.image.clientWidth,
                height: this.$refs.image.clientHeight,
            };
        },
        handleMouseMove(e) {
            const rect = this.$refs.container.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        },
        handleMouseLeave() {
            this.mouseX = this.center.x;
            this.mouseY = this.center.y;
        },
        fnFirstComplete() {
            this.$refs.secondTyped.render();
        },
    },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.carousel-item-container {
    // background: @dark;
    width: 100%;
    height: 100%;
    color: #fff;
    position: relative;
    overflow: hidden;
}
.carousel-img {
    width: 110%;
    height: 110%;
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.3s;
}

.title,
.desc {
    position: absolute;
    letter-spacing: 3px;
    left: 30px;
    color: #fff;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
        0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
}
.title {
    top: calc(50% - 40px);
    font-size: 2em;
}
.desc {
    top: calc(50% + 20px);
    font-size: 1.2em;
    color: lighten(@gray, 20%);
    padding-right: 100px;
}
</style>

