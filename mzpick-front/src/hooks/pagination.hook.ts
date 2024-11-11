import { useEffect, useState } from "react";

// variable: 페이지 당 아이템 수 //
const ITEMS_PER_PAGE = 5;
// variable: 섹션 당 페이지 수 //
const PAGES_PER_SECTION = 5;

const usePagination = <T>() => {
    // state: 페이징 관련 상태 //
    const [savetotalList, savesetTotalList] = useState<T[]>([]);
    const [savetotalCount, savesetTotalCount] = useState<number>(0);
    const [savetotalPage, savesetTotalPage] = useState<number>(0);
    const [savetotalSection, savesetTotalSection] = useState<number>(0);
    const [savecurrentPage, savesetCurrentPage] = useState<number>(0);
    const [savecurrentSection, savesetCurrentSection] = useState<number>(0);
    const [savepageList, savesetPageList] = useState<number[]>([]);
    const [saveviewList, savesetViewList] = useState<T[]>([]);
    
    const [liketotalList, likesetTotalList] = useState<T[]>([]);
    const [liketotalCount, likesetTotalCount] = useState<number>(0);
    const [liketotalPage, likesetTotalPage] = useState<number>(0);
    const [liketotalSection, likesetTotalSection] = useState<number>(0);
    const [likecurrentPage, likesetCurrentPage] = useState<number>(0);
    const [likecurrentSection, likesetCurrentSection] = useState<number>(0);
    const [likepageList, likesetPageList] = useState<number[]>([]);
    const [likeviewList, likesetViewList] = useState<T[]>([]);

    const [writetotalList, writesetTotalList] = useState<T[]>([]);
    const [writetotalCount, writesetTotalCount] = useState<number>(0);
    const [writetotalPage, writesetTotalPage] = useState<number>(0);
    const [writetotalSection, writesetTotalSection] = useState<number>(0);
    const [writecurrentPage, writesetCurrentPage] = useState<number>(0);
    const [writecurrentSection, writesetCurrentSection] = useState<number>(0);
    const [writepageList, writesetPageList] = useState<number[]>([]);
    const [writeviewList, writesetViewList] = useState<T[]>([]);

    const [votetotalList, votesetTotalList] = useState<T[]>([]);
    const [votetotalCount, votesetTotalCount] = useState<number>(0);
    const [votetotalPage, votesetTotalPage] = useState<number>(0);
    const [votetotalSection, votesetTotalSection] = useState<number>(0);
    const [votecurrentPage, votesetCurrentPage] = useState<number>(0);
    const [votecurrentSection, votesetCurrentSection] = useState<number>(0);
    const [votepageList, votesetPageList] = useState<number[]>([]);
    const [voteviewList, votesetViewList] = useState<T[]>([]);

    // function: save 리스트 변경 함수 //
    const initsave = (savetotalList: T[]) => {
        const savetotalCount = savetotalList.length;
        savesetTotalCount(savetotalCount);
        const savetotalPage = Math.ceil(savetotalCount / ITEMS_PER_PAGE);
        savesetTotalPage(savetotalPage);    
        const savetotalSection = Math.ceil(savetotalPage / PAGES_PER_SECTION);
        savesetTotalSection(savetotalSection);

        savesetCurrentPage(1);
        savesetCurrentSection(1);

        initlikeViewList(savetotalList);
    };

    const initsaveViewList = (savetotalList: T[]) => {
        const savetotalCount = savetotalList.length;
        const startIndex = ITEMS_PER_PAGE * (savecurrentPage -1);
        let endIndex = startIndex + ITEMS_PER_PAGE;
        if (endIndex > savetotalCount) endIndex = savetotalCount;

        const viewList = savetotalList.slice(startIndex, endIndex);
        savesetViewList(viewList);
        };

        const initsavePageList = (savetotalPage: number) => {
            if (!savetotalPage) {
                savesetPageList([]);
                return;
            }

            const startPage = PAGES_PER_SECTION * savecurrentSection - (PAGES_PER_SECTION - 1);
            let endPage = PAGES_PER_SECTION * savecurrentSection;
            if (endPage >  savetotalPage) endPage = savetotalPage;

            const savepageList = [];
            for (let page = startPage; page <= endPage; page++) {
                savepageList.push(page);
            }
            savesetPageList(savepageList);
        };

        // event handler : 페이지 클릭 이벤트 처리 함수 //
        const onSavePageClickHandler = (page : number) => {
            savesetCurrentPage(page);
        };

        // event handler: 이전 섹션 클릭 이벤트 처리 함수 //
        const onSavePreSectionClickHandler = () => {
            if (savecurrentSection <= 1) return;
            savesetCurrentSection(savecurrentSection -1);
            savesetCurrentPage((savecurrentSection -1) * PAGES_PER_SECTION);
        };

        // event handler : 다음 섹션 클릭 이벤트 처리 함수 //
        const onSaveNextSectionClickHandler = () => {
            if (savecurrentSection === savetotalSection) return;
            savesetCurrentSection(savecurrentSection + 1);
            savesetCurrentPage(savecurrentSection * PAGES_PER_SECTION + 1);
        };

        // effect : totalList가 변경될 시 실행할 함수 //
        useEffect(() => {
            initlike(savetotalList);
        }, [savetotalList]);

        // effect : 현재 섹션이 변경될 시 실행할 함수 //
        useEffect(() => {
            initLikePageList(savetotalPage);
        },[savetotalCount, savecurrentSection]);

        // effect : 현재 페이지가 변경될 시 실행할 함수 //
        useEffect(() => {
            initlikeViewList(savetotalList);
        }, [savecurrentPage]);

    // function: like 리스트 변경 함수 //
    const initlike = (liketotalList: T[]) => {
        const liketotalCount = liketotalList.length;
        likesetTotalCount(liketotalCount);
        const liketotalPage = Math.ceil(liketotalCount / ITEMS_PER_PAGE);
        likesetTotalPage(liketotalPage);    
        const liketotalSection = Math.ceil(liketotalPage / PAGES_PER_SECTION);
        likesetTotalSection(liketotalSection);

        likesetCurrentPage(1);
        likesetCurrentSection(1);

        initlikeViewList(liketotalList);
    };

    const initlikeViewList = (liketotalList: T[]) => {
        const liketotalCount = liketotalList.length;
        const startIndex = ITEMS_PER_PAGE * (likecurrentPage -1);
        let endIndex = startIndex + ITEMS_PER_PAGE;
        if (endIndex > liketotalCount) endIndex = liketotalCount;

        const viewList = liketotalList.slice(startIndex, endIndex);
        likesetViewList(viewList);
        };

        const initLikePageList = (liketotalPage: number) => {
            if (!liketotalPage) {
                likesetPageList([]);
                return;
            }

            const startPage = PAGES_PER_SECTION * likecurrentSection - (PAGES_PER_SECTION - 1);
            let endPage = PAGES_PER_SECTION * likecurrentSection;
            if (endPage >  liketotalPage) endPage = liketotalPage;

            const likepageList = [];
            for (let page = startPage; page <= endPage; page++) {
                likepageList.push(page);
            }
            likesetPageList(likepageList);
        };

        // event handler : 페이지 클릭 이벤트 처리 함수 //
        const onLikePageClickHandler = (page : number) => {
            likesetCurrentPage(page);
        };

        // event handler: 이전 섹션 클릭 이벤트 처리 함수 //
        const onLikePreSectionClickHandler = () => {
            if (likecurrentSection <= 1) return;
            likesetCurrentSection(likecurrentSection -1);
            likesetCurrentPage((likecurrentSection -1) * PAGES_PER_SECTION);
        };

        // event handler : 다음 섹션 클릭 이벤트 처리 함수 //
        const onLikeNextSectionClickHandler = () => {
            if (likecurrentSection === liketotalSection) return;
            likesetCurrentSection(likecurrentSection + 1);
            likesetCurrentPage(likecurrentSection * PAGES_PER_SECTION + 1);
        };

        // effect : totalList가 변경될 시 실행할 함수 //
        useEffect(() => {
            initlike(liketotalList);
        }, [liketotalList]);

        // effect : 현재 섹션이 변경될 시 실행할 함수 //
        useEffect(() => {
            initLikePageList(liketotalPage);
        },[liketotalCount, likecurrentSection]);

        // effect : 현재 페이지가 변경될 시 실행할 함수 //
        useEffect(() => {
            initlikeViewList(liketotalList);
        }, [likecurrentPage]);

            // function: write 리스트 변경 함수 //
    const initwrite = (writetotalList: T[]) => {
        const writetotalCount = writetotalList.length;
        writesetTotalCount(writetotalCount);
        const writetotalPage = Math.ceil(writetotalCount / ITEMS_PER_PAGE);
        writesetTotalPage(writetotalPage);    
        const writetotalSection = Math.ceil(writetotalPage / PAGES_PER_SECTION);
        writesetTotalSection(writetotalSection);

        writesetCurrentPage(1);
        writesetCurrentSection(1);

        initwriteViewList(writetotalList);
    };

    const initwriteViewList = (writetotalList: T[]) => {
        const writetotalCount = writetotalList.length;
        const startIndex = ITEMS_PER_PAGE * (writecurrentPage -1);
        let endIndex = startIndex + ITEMS_PER_PAGE;
        if (endIndex > writetotalCount) endIndex = writetotalCount;

        const viewList = writetotalList.slice(startIndex, endIndex);
        writesetViewList(viewList);
        };

        const initwritePageList = (writetotalPage: number) => {
            if (!writetotalPage) {
                writesetPageList([]);
                return;
            }

            const startPage = PAGES_PER_SECTION * writecurrentSection - (PAGES_PER_SECTION - 1);
            let endPage = PAGES_PER_SECTION * writecurrentSection;
            if (endPage >  writetotalPage) endPage = writetotalPage;

            const writepageList = [];
            for (let page = startPage; page <= endPage; page++) {
                writepageList.push(page);
            }
            writesetPageList(writepageList);
        };

        // event handler : 페이지 클릭 이벤트 처리 함수 //
        const onwritePageClickHandler = (page : number) => {
            writesetCurrentPage(page);
        };

        // event handler: 이전 섹션 클릭 이벤트 처리 함수 //
        const onwritePreSectionClickHandler = () => {
            if (writecurrentSection <= 1) return;
            writesetCurrentSection(writecurrentSection -1);
            writesetCurrentPage((writecurrentSection -1) * PAGES_PER_SECTION);
        };

        // event handler : 다음 섹션 클릭 이벤트 처리 함수 //
        const onwriteNextSectionClickHandler = () => {
            if (writecurrentSection === writetotalSection) return;
            writesetCurrentSection(writecurrentSection + 1);
            writesetCurrentPage(writecurrentSection * PAGES_PER_SECTION + 1);
        };

        // effect : totalList가 변경될 시 실행할 함수 //
        useEffect(() => {
            initwrite(writetotalList);
        }, [writetotalList]);

        // effect : 현재 섹션이 변경될 시 실행할 함수 //
        useEffect(() => {
            initwritePageList(writetotalPage);
        },[writetotalCount, writecurrentSection]);

        // effect : 현재 페이지가 변경될 시 실행할 함수 //
        useEffect(() => {
            initwriteViewList(writetotalList);
        }, [writecurrentPage]);

        
            // function: vote 리스트 변경 함수 //
        const initvote = (votetotalList: T[]) => {
        const votetotalCount = votetotalList.length;
        votesetTotalCount(votetotalCount);
        const votetotalPage = Math.ceil(votetotalCount / ITEMS_PER_PAGE);
        votesetTotalPage(votetotalPage);    
        const votetotalSection = Math.ceil(votetotalPage / PAGES_PER_SECTION);
        votesetTotalSection(votetotalSection);

        votesetCurrentPage(1);
        votesetCurrentSection(1);

        initvoteViewList(votetotalList);
    };

        const initvoteViewList = (votetotalList: T[]) => {
        const votetotalCount = votetotalList.length;
        const startIndex = ITEMS_PER_PAGE * (votecurrentPage -1);
        let endIndex = startIndex + ITEMS_PER_PAGE;
        if (endIndex > votetotalCount) endIndex = votetotalCount;

        const viewList = votetotalList.slice(startIndex, endIndex);
        votesetViewList(viewList);
        };

        const initvotePageList = (votetotalPage: number) => {
            if (!votetotalPage) {
                votesetPageList([]);
                return;
            }

            const startPage = PAGES_PER_SECTION * votecurrentSection - (PAGES_PER_SECTION - 1);
            let endPage = PAGES_PER_SECTION * votecurrentSection;
            if (endPage >  votetotalPage) endPage = votetotalPage;

            const votepageList = [];
            for (let page = startPage; page <= endPage; page++) {
                votepageList.push(page);
            }
            votesetPageList(votepageList);
        };

        // event handler : 페이지 클릭 이벤트 처리 함수 //
        const onvotePageClickHandler = (page : number) => {
            votesetCurrentPage(page);
        };

        // event handler: 이전 섹션 클릭 이벤트 처리 함수 //
        const onvotePreSectionClickHandler = () => {
            if (votecurrentSection <= 1) return;
            votesetCurrentSection(votecurrentSection -1);
            votesetCurrentPage((votecurrentSection -1) * PAGES_PER_SECTION);
        };

        // event handler : 다음 섹션 클릭 이벤트 처리 함수 //
        const onvoteNextSectionClickHandler = () => {
            if (votecurrentSection === votetotalSection) return;
            votesetCurrentSection(votecurrentSection + 1);
            votesetCurrentPage(votecurrentSection * PAGES_PER_SECTION + 1);
        };

        // effect : totalList가 변경될 시 실행할 함수 //
        useEffect(() => {
            initvote(votetotalList);
        }, [votetotalList]);

        // effect : 현재 섹션이 변경될 시 실행할 함수 //
        useEffect(() => {
            initvotePageList(votetotalPage);
        },[votetotalCount, votecurrentSection]);

        // effect : 현재 페이지가 변경될 시 실행할 함수 //
        useEffect(() => {
            initvoteViewList(votetotalList);
        }, [votecurrentPage]);

    return {
        savecurrentPage,
        savetotalPage,
        savetotalCount,
        saveviewList,
        savepageList,
        savesetTotalList,
        likecurrentPage,
        liketotalPage,
        liketotalCount,
        likeviewList,
        likepageList,
        likesetTotalList,
        initsaveViewList,
        onSavePageClickHandler,
        onSavePreSectionClickHandler,
        onSaveNextSectionClickHandler,
        writecurrentPage,
        writetotalPage,
        writetotalCount,
        writeviewList,
        writepageList,
        writesetTotalList,
        initwriteViewList,
        onwritePageClickHandler,
        onwritePreSectionClickHandler,
        onwriteNextSectionClickHandler,
        votecurrentPage,
        votetotalPage,
        votetotalCount,
        voteviewList,
        votepageList,
        votesetTotalList,
        initvoteViewList,
        onvotePageClickHandler,
        onvotePreSectionClickHandler,
        onvoteNextSectionClickHandler,
        initlikeViewList,
        onLikePageClickHandler,
        onLikePreSectionClickHandler,
        onLikeNextSectionClickHandler
    };
};


export default usePagination;