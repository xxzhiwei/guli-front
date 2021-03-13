<template>
    <div id="aCoursesList" class="bg-fa of">
        <!-- 讲师列表 开始 -->
        <section class="container">
            <header class="comm-title all-teacher-title">
                <h2 class="fl tac">
                    <span class="c-333">全部讲师</span>
                </h2>
                <section class="c-tab-title">
                    <a id="subjectAll" title="全部" href="#">全部</a>
                    <!-- <c:forEach var="subject" items="${subjectList }">
                            <a id="${subject.subjectId}" title="${subject.subjectName }" href="javascript:void(0)" onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
          </c:forEach>-->
                </section>
            </header>
            <section class="c-sort-box unBr">
                <div>
                    <!-- /无数据提示 开始-->
                    <section class="no-data-wrap" v-if="!records.length">
                        <em class="icon30 no-data-ico">&nbsp;</em>
                        <span class="c-666 fsize14 ml10 vam"
                            >没有相关数据，小编正在努力整理中...</span
                        >
                    </section>
                    <!-- /无数据提示 结束-->
                    <article class="i-teacher-list">
                        <ul class="of">
                            <li v-for="(item, index) of records" :key="'teacher-' + index">
                                <section class="i-teach-wrap">
                                    <div class="i-teach-pic" style="height: 140px; width: 140px;">
                                        <a
                                            :href="`/teacher/${item.id}`"
                                            :title="item.name"
                                        >
                                            <img
                                                :src="item.avatar"
                                                alt
                                            />
                                        </a>
                                    </div>
                                    <div class="mt10 hLh30 txtOf tac">
                                        <a
                                            :href="`/teacher/${item.id}`"
                                            :title="item.name"
                                            class="fsize18 c-666"
                                            >{{item.name}}</a
                                        >
                                    </div>
                                    <div class="hLh30 txtOf tac">
                                        <span class="fsize14 c-999"
                                            >{{item.intro}}</span
                                        >
                                    </div>
                                    <div class="mt15 i-q-txt">
                                        <p class="c-999 f-fA">
                                            {{item.career}}
                                        </p>
                                    </div>
                                </section>
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
        <!-- /讲师列表 结束 -->
    </div>
</template>
<script>
import { getTeachers } from "../../api/teacher";
export default {
    data() {
        return {
            requestParams: {
                current: 1,
                size: 8,
            },
            total: 0,
            pages: 0,
            records: [],
            hasNext: false,
            hasPrevious: false,
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getTeachers();
        },
        async getTeachers() {
            const result = await getTeachers(this.requestParams);
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
            this.getTeachers();
        },
        getLast() {
            this.requestParams.current = this.pages;
            this.getTeachers();
        },
        getPrevious() {
            if (this.hasPrevious) {
                this.requestParams.current -= 1;
                this.getTeachers();
            }
        },
        getNext() {
            if (this.hasNext) {
                this.requestParams.current += 1;
                this.getTeachers();
            }
        },
        getSpecified(n) {
            this.requestParams.current = n;
            this.getTeachers();
        },
    },
};
</script>