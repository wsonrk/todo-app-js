import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";
  // 未完了リストを作成
  createIncompleteList(inputText);
};

// 指定のリストから指定の要素を削除
const deleteFromTargetList = (targetList, targetElement) => {
  document.getElementById(targetList).removeChild(targetElement);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // liタグ生成
  const li = document.createElement("li");
  // divタグ生成
  const div = document.createElement("div");
  div.className = "list-row";
  // pタグ生成
  const p = document.createElement("p");
  p.className = "task-name";
  p.innerText = text;

  // button(完了)
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親タグ(li)を未完了リストから取得
    const completeTarget = completeButton.parentNode.parentNode;
    // 未完了リストから削除
    deleteFromTargetList("incomplete-list", completeTarget);

    // TODO内容のテキストを取得
    const text = completeButton.parentNode.firstElementChild.innerText;

    // li以下を初期化
    completeTarget.textContent = null;

    // divタグ生成
    const div = document.createElement("div");
    div.className = "list-row";

    // pタグ生成
    const p = document.createElement("p");
    p.className = "task-name";
    p.innerText = text;

    // button(戻す)
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 完了リストから削除する対象を取得
      const backTarget = backButton.parentNode.parentNode;
      // 押された戻すボタンの親タグ（li)を完了リストから削除
      deleteFromTargetList("complete-list", backTarget);
      // TODO内容のテキストを取得
      const text = backButton.parentNode.firstElementChild.innerText;
      // 未完了リストを作成
      createIncompleteList(text);
    });

    // liタグの子要素に各要素を設定
    li.appendChild(div);
    div.appendChild(p);
    div.appendChild(backButton);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(li);
  });

  // button(削除)
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    const deleteTarget = deleteButton.parentNode.parentNode;
    // 押された削除ボタンの親タグ(li)を未完了リストから削除
    deleteFromTargetList("incomplete-list", deleteTarget);
  });

  // liタグの子要素に各要素を設定
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

// 追加ボタンのイベントリスナーを設定
document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
