(() => {
  'use strict';

  const worksList = document.querySelectorAll('.works__list-content');
  const pageNums = document.querySelectorAll('.page-num');
  const previousPostLink = document.getElementById('previous-post-link');
  const leftNum = document.getElementById('left-num');
  const centerNum = document.getElementById('center-num');
  const rightNum = document.getElementById('right-num');
  const nextPostLink = document.getElementById('next-post-link');
  const range: Number = 1;
  const maxRange: Number = 3;
  let maxPageNum: Number = 0;
  let workItemCount: Number = 0;

  worksList.forEach((workItem, index) => {
    // 最初のレンダリングで4つ目以降の要素を削除
    if (index > 2) {
      workItem.style.display = 'none';
    }

    // workItemの数をカウント
    workItemCount++;
  });

  // workItemの総数から最大ページ数を算出
  maxPageNum = Math.ceil(workItemCount / maxRange);

  // 最初は1からスタートなので、前ページリンクは削除
  previousPostLink.style.display = 'none';

  // ページネーション番号をクリックした際の処理
  pageNums.forEach((pageNum) => {
    pageNum.addEventListener('click', function () {
      let worksGroupNum = Number(this.innerText);

      switchPreviousLink();
      switchNextLink(worksGroupNum);
      switchItem(worksList, worksGroupNum);

      pageNums.forEach((pageNum) => {
        pageNum.classList.remove('current');
      });

      if (worksGroupNum === 1) {
        currentFirstPage();
        previousPostLink.style.display = 'none';
        leftNum.classList.add('current');
      } else if (worksGroupNum === maxPageNum) {
        currentLastPage();
        previousPostLink.style.display = 'block';
        rightNum.classList.add('current');
      } else {
        switchNum(worksGroupNum);
        previousPostLink.style.display = 'block';
        centerNum.classList.add('current');
      }
    });
  });

  // 前リンクをクリックした際の処理
  previousPostLink.addEventListener('click', function () {
    let previousNum = 0;

    pageNums.forEach((pageNum) => {
      if (pageNum.classList.contains('current')) {
        if (Number(pageNum.innerText) === 1) {
          previousNum = 1;
        } else {
          previousNum = Number(pageNum.innerText) - 1;
        }
        pageNum.classList.remove('current');
      }
    });

    if (previousNum === 1) {
      leftNum.classList.add('current');
    } else {
      centerNum.classList.add('current');
    }

    nextPostLink.style.display = 'block';
    switchPreviousLink();
    switchItem(worksList, previousNum);

    if (previousNum === 1) {
      currentFirstPage();
      previousPostLink.style.display = 'none';
    } else {
      switchNum(previousNum);
      previousPostLink.style.display = 'block';
    }
  });

  // 次リンクをクリックした際の処理
  nextPostLink.addEventListener('click', function () {
    let nextNum = 0;

    pageNums.forEach((pageNum) => {
      if (pageNum.classList.contains('current')) {
        nextNum = Number(pageNum.innerText) + 1;
        pageNum.classList.remove('current');
      }
    });

    if (nextNum === maxPageNum) {
      rightNum.classList.add('current');
    } else {
      centerNum.classList.add('current');
    }

    switchPreviousLink();
    switchNextLink(nextNum);
    switchItem(worksList, nextNum);

    if (nextNum === maxPageNum) {
      currentLastPage();
      nextPostLink.style.display = 'none';
    } else {
      switchNum(nextNum);
    }
  });

  /* -------------
    関数
  ------------- */

  // 表示要素の切り替え用の関数
  const switchItem = (itemList, switchCondition) => {
    itemList.forEach((item) => {
      if (Number(item.dataset.workGroupIndex) === switchCondition) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  };

  // ページネーションの番号切り替え用の関数
  const switchNum = (num: Number) => {
    leftNum.innerText = num - range;
    centerNum.innerText = num;
    rightNum.innerText = num + range;
  };

  // 前ページリンクの表示切り替え用の関数
  const switchPreviousLink = () => {
    if (
      leftNum.classList.contains('current') &&
      Number(leftNum.innerText) === 1
    ) {
      previousPostLink.style.display = 'none';
    } else {
      previousPostLink.style.display = 'block';
    }
  };

  // 次ページリンクの表示切り替え用の関数
  const switchNextLink = (num: Number) => {
    if (num === maxPageNum) {
      nextPostLink.style.display = 'none';
    } else {
      nextPostLink.style.display = 'block';
    }
  };

  // 1ページ
  const currentFirstPage = () => {
    leftNum.innerText = '1';
    centerNum.innerText = '2';
    rightNum.innerText = '3';
  };

  // ラストページ
  const currentLastPage = () => {
    leftNum.innerText = maxPageNum - 2;
    centerNum.innerText = maxPageNum - 1;
    rightNum.innerText = maxPageNum;
  };
})();
