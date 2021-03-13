<template>
    <div id="aCoursesList" class="bg-fa of">
        <!-- /课程列表 开始 -->
        <section class="container">
            <header class="comm-title">
                <h2 class="fl tac">
                    <span class="c-333">全部课程</span>
                </h2>
            </header>
            <section class="c-sort-box">
                <section class="c-s-dl">
                    <dl>
                        <dt>
                            <span class="c-999 fsize14">课程类别</span>
                        </dt>
                        <dd class="c-s-dl-li">
                            <ul class="clearfix">
                                <li
                                    v-for="(item, index) of subjectTreeNodes"
                                    :key="'subjectTreeNode-' + index"
                                >
                                    <a
                                        :class="
                                            requestParams.subjectParentId === item.id
                                                ? 'current'
                                                : ''
                                        "
                                        :title="item.title"
                                        href="javascript:void(0);"
                                        @click="onParentSubject(item)"
                                        >{{ item.title }}</a
                                    >
                                </li>
                            </ul>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <span class="c-999 fsize14"></span>
                        </dt>
                        <dd class="c-s-dl-li">
                            <ul class="clearfix">
                                <li
                                    v-for="(item, index) of subjects"
                                    :key="'subject-' + index"
                                >
                                    <a
                                        :class="
                                            requestParams.subjectId === item.id
                                                ? 'current'
                                                : ''
                                        "
                                        :title="item.title"
                                        href="javascript:void(0);"
                                        @click="onSubject(item)"
                                        >{{ item.title }}</a
                                    >
                                </li>
                            </ul>
                        </dd>
                    </dl>
                    <div class="clear"></div>
                </section>
                <div class="js-wrap">
                    <section class="fr">
                        <span class="c-ccc">
                            <i class="c-master f-fM">1</i>/
                            <i class="c-666 f-fM">1</i>
                        </span>
                    </section>
                    <section class="fl">
                        <ol class="js-tap clearfix">
                            <li v-for="(item, index) of sorts" :key="'sort' + index" :class="requestParams.sort === item.value ? 'current bg-orange' : ''">
                                <a v-if="item.value === 'PRICE'" :title="item.name" href="javascript:void(0);" @click="onSort(item)">
                                    {{item.name}}&nbsp;<span>↓</span>
                                </a>
                                <a v-else :title="item.name" href="javascript:void(0);" @click="onSort(item)">
                                    {{item.name}}
                                </a>
                            </li>
                        </ol>
                    </section>
                </div>
                <div class="mt40">
                    <!-- /无数据提示 开始-->
                    <section class="no-data-wrap" v-if="!records.length">
                        <em class="icon30 no-data-ico">&nbsp;</em>
                        <span class="c-666 fsize14 ml10 vam"
                            >没有相关数据，小编正在努力整理中...</span
                        >
                    </section>
                    <!-- /无数据提示 结束-->
                    <article class="comm-course-list">
                        <ul class="of" id="bna">
                            <li
                                v-for="(item, index) of records"
                                :key="'course-' + index"
                            >
                                <div class="cc-l-wrap">
                                    <section class="course-img">
                                        <img
                                            :src="item.cover"
                                            class="img-responsive"
                                            :alt="item.title"
                                        />
                                        <div class="cc-mask">
                                            <a
                                                :href="`/course/${item.id}`"
                                                title="开始学习"
                                                class="comm-btn c-btn-1"
                                                >开始学习</a
                                            >
                                        </div>
                                    </section>
                                    <h3 class="hLh30 txtOf mt10">
                                        <a
                                            :href="`/course/${item.id}`"
                                            :title="item.title"
                                            class="course-title fsize18 c-333"
                                            >{{ item.title }}</a
                                        >
                                    </h3>
                                    <section class="mt10 hLh20 of">
                                        <span class="fr jgTag bg-green">
                                            <i class="c-fff fsize12 f-fA"
                                                >免费</i
                                            >
                                        </span>
                                        <span class="fl jgAttr c-ccc f-fA">
                                            <i class="c-999 f-fA"
                                                >{{ item.buyCount }}人学习</i
                                            >
                                            |
                                            <i class="c-999 f-fA">9634评论</i>
                                        </span>
                                    </section>
                                </div>
                            </li>
                        </ul>
                        <div class="clear"></div>
                    </article>
                </div>
                <!-- 公共分页 开始 -->
                <div>
                    <div class="paging">
                        <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
                        <a
                            href="javascript:void(0);"
                            title="首页"
                            @click="getFirst"
                            >首</a
                        >
                        <a
                            href="javascript:void(0);"
                            title="前一页"
                            @click="getPrevious"
                            >&lt;</a
                        >
                        <a
                            href="javascript:void(0);"
                            :class="
                                requestParams.current === n ? 'current' : ''
                            "
                            v-for="n in pages"
                            :key="'page-' + n"
                            :title="`第${n}页`"
                            @click="getSpecified(n)"
                            >{{ n }}</a
                        >
                        <a
                            href="javascript:void(0);"
                            title="后一页"
                            @click="getNext"
                            >&gt;</a
                        >
                        <a
                            href="javascript:void(0);"
                            title="末页"
                            @click="getLast"
                            >末</a
                        >
                        <div class="clear"></div>
                    </div>
                </div>
                <!-- 公共分页 结束 -->
            </section>
        </section>
        <!-- /课程列表 结束 -->
    </div>
</template>
<script>
import { getCourses } from "../../api/course";
import { getSubjectTreeNodes } from "../../api/subject";

const sorts = [
    { name: "关注度", value: "ATTENTION" },
    { name: "最新", value: "CREATE_TIME" },
    { name: "价格", value: "PRICE" },
];
export default {
    data() {
        return {
            subjectTreeNodes: [],
            subjects: [], // 子分类
            requestParams: {
                current: 1,
                size: 4,
                sort: sorts[0].value,
                subjectParentId: "",
                subjectId: "",
            },
            total: 0,
            pages: 0,
            records: [],
            hasNext: false,
            hasPrevious: false,
            sorts,
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getSubjectTreeNodes();
            this.getCourses();
        },
        async getCourses() {
            const result = await getCourses(this.requestParams);
            if (result.success) {
                const {
                    data: { total, pages, records, hasNext, hasPrevious },
                } = result;
                this.total = total;
                this.pages = pages;
                this.records = records;
                this.hasNext = hasNext;
                this.hasPrevious = hasPrevious;
            }
        },
        getFirst() {
            this.requestParams.current = 1;
            this.getCourses();
        },
        getLast() {
            this.requestParams.current = this.pages;
            this.getCourses();
        },
        getPrevious() {
            if (this.hasPrevious) {
                this.requestParams.current -= 1;
                this.getCourses();
            }
        },
        getNext() {
            if (this.hasNext) {
                this.requestParams.current += 1;
                this.getCourses();
            }
        },
        getSpecified(n) {
            this.requestParams.current = n;
            this.getCourses();
        },

        // 去掉子节点的children
        transformTreeNodes(treeNodes) {
            function run(treeNodes) {
                for (const treeNode of treeNodes) {
                    if (treeNode.children && treeNode.children.length) {
                        run(treeNode.children);
                    } else if (treeNode.children) {
                        delete treeNode.children;
                    }
                }
            }
            run(treeNodes);
            return treeNodes;
        },

        async getSubjectTreeNodes() {
            const result = await getSubjectTreeNodes();
            if (result.code === 20000) {
                const subjectTreeNodes = this.transformTreeNodes(
                    result.data.records
                );
                subjectTreeNodes.unshift({
                    id: "",
                    children: [],
                    title: "全部",
                });
                this.subjectTreeNodes = subjectTreeNodes;
                this.onParentSubject(this.subjectTreeNodes[0]);
            }
        },

        onParentSubject(pSubject) {
            this.requestParams.subjectParentId = pSubject.id;
            this.subjects = pSubject.children;

            this.onSubject(
                this.subjects.length ? this.subjects[0] : { id: "" }
            );
        },

        onSubject(subject) {
            this.requestParams.subjectId = subject.id;
            this.getCourses();
        },

        onSort(sort) {
            this.requestParams.sort = sort.value;
            this.getCourses();
        },
    },
};
</script>

<style>
.c-s-dl dl ul li .current {
    color: #ea562e;
    text-decoration: none;
}
</style>