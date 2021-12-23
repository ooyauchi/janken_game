//ここに処理を追加
//グーは0,チョキは1,パーは2
//あいこは0,勝ちは1,負けは-1
//自分が0番目の箱comが1番目の箱

/*----コナミコマンドの設定----------------------*/

//コナミコマンド[↑, ↑, ↓, ↓, ←, →, ←, →, B, A]
const konami_cmd = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
let input_cmd = []


//コナミコマンド事態の関数
$(window).keyup(function (event) {

    // 入力されたキーコードを入力キー配列へ追加
    input_cmd.push(event.keyCode)
    console.log(input_cmd)

    // 入力されたキーが正しいか判定
    // ※ 入力キー配列の長さで何番目の文字を比較するかを判断する
    if (input_cmd[input_cmd.length - 1] != konami_cmd[input_cmd.length - 1]) {
        // 入力を間違えた場合、入力キー配列をリセット（最初からやり直し）
        input_cmd = []
    }
    // 全ての入力コマンドが合致したら処理を発動
    else if (input_cmd.length == konami_cmd.length) {
        // コナミコマンドによる処理実行！
        konami_cmd_action()
        // 処理後、改めて入力キー配列をリセット
        input_cmd = []
    }
})
function konami_cmd_action() {
    $("#guchopa_btn").removeClass("displayNone")
}
/*---------------------------------------*/

//ノーマルモードのコンピューターの出す手の決定
function com_pattern() {
    let comhand
    let pattern_random = Math.floor((Math.random() * 20))
    if (pattern_random === 7) {
        comhand = Math.floor((Math.random() * 4))
        if (comhand === 3) {
            comhand = 0
        }
        $("#com_information").text("グーを出す確率が高いです")
    } else if (pattern_random === 8) {
        comhand = Math.floor((Math.random() * 4))
        if (comhand === 3) {
            comhand = 1
        }
        $("#com_information").text("チョキを出す確率が高いです")
    } else if (pattern_random === 9) {
        comhand = Math.floor((Math.random() * 4))
        if (comhand === 3) {
            comhand = 2
        }
        $("#com_information").text("パーを出す確率が高いです")
    } else if (pattern_random === 10) {
        comhand = Math.floor((Math.random() * 2))
        $("#com_information").text("相手はパーは出さないです")
    } else if (pattern_random === 11) {
        comhand = Math.floor((Math.random() * 2))
        if (comhand === 0) {
            comhand = 2
        }
        $("#com_information").text("相手はグーは出さないです")
    } else if (pattern_random === 12) {
        comhand = Math.floor((Math.random() * 2))
        if (comhand === 1) {
            comhand = 2
        }
        $("#com_information").text("相手はチョキは出さないです")
    }
    else {
        comhand = Math.floor((Math.random() * 3))
        $("#com_information").text("通常時です")
    }
    console.log(comhand)
    return comhand
}
//脳トレモードのコンピューターの出す手の決定
function brain_com_pattern() {
    let comhand
    let pattern_random = Math.floor((Math.random() * 9))
    if (pattern_random === 0) {
        comhand = 0
        $("#com_information").text("パーとあいこを出してください")
    } else if (pattern_random === 1) {
        comhand = 1
        $("#com_information").text("グーとあいこを出してください")
    } else if (pattern_random === 2) {
        comhand = 2
        $("#com_information").text("チョキとあいこを出してください")
    } else if (pattern_random === 3) {
        comhand = 0
        $("#com_information").text("グーに勝つ手を出してください")
    } else if (pattern_random === 4) {
        comhand = 1
        $("#com_information").text("チョキに勝つ手を出してください")
    } else if (pattern_random === 5) {
        comhand = 2
        $("#com_information").text("パーに勝つ手を出してください")
    } else if (pattern_random === 6) {
        comhand = 0
        $("#com_information").text("チョキに負ける手を出してください")
    } else if (pattern_random === 7) {
        comhand = 1
        $("#com_information").text("パーに負ける手を出してください")
    } else if (pattern_random === 8) {
        comhand = 2
        $("#com_information").text("グーに負ける手を出してください")
    } else {
        $("#com_information").text("エラー")
    }
    console.log(comhand)
    return comhand
}
//脳トレモードの処理
function brain_life_point(judgement, mylife, comlife) {
    if ((judgement === -1) || (judgement === 0)) {
        comlife = comlife + 10
        $(".bg").fadeOut(50).fadeIn(50)
    } else if (judgement === 1) {
        comlife = comlife - 10
    } else {
        alert("error")
    }
    $("#com_life").text(comlife)
    return [mylife, comlife]
}
//脳トレモードの最後の処理
function brain_final_judge(second, mylife, comlife) {
    if (comlife <= 0) {
        const result_second = second / 100
        $("footer").text(result_second + "秒")
        $("#final_result").text(result_second + "秒")

        //画面の遷移
        $("#page2").addClass("displayNone")
        $("#page3").removeClass("displayNone")
    } else {
        $("footer").text("勝負中です")
    }
    return [mylife, comlife]
}

// 相手の手を表示する関数
function com_guchopa(comhand) {
    if (comhand === 0) {
        $("#com_hand").text("相手はグーを出しました")
    } else if (comhand === 1) {
        $("#com_hand").text("相手はチョキを出しました")
    } else if (comhand === 2) {
        $("#com_hand").text("相手はパーを出しました")
    } else {
        $("#com_hand").text("error")
    }
}
// じゃんけんの勝ち負けの判定
function janken_rule(comhand, myhand) {
    console.log(comhand)//大事
    //グーは0,チョキは1,パーは2
    if (myhand === comhand) {
        $("#result").text("あいこ")
        return 0
    } else if ((myhand === 0 && comhand === 1) || (myhand === 1 && comhand === 2) || (myhand === 2 && comhand === 0)) {
        $("#result").text("あなたの勝ち")
        return 1
    } else if ((myhand === 1 && comhand === 0) || (myhand === 2 && comhand === 1) || (myhand === 0 && comhand === 2)) {
        $("#result").text("あなたの負け")
        return -1
    } else if (myhand === 3) {
        $("#result").text("ずるいけどあなたの勝ち")
        return 1
    } else {
        $("#result").text("error")
    }
}
//ヒットポイントの減り方
function life_point(judgement, mylife, comlife) {
    if (judgement === -1) {
        mylife = mylife - 10
    } else if (judgement === 0) {
        mylife = mylife - 5
        comlife = comlife - 5
    } else if (judgement === 1) {
        comlife = comlife - 10
    } else {
        alert("error")
    }
    $("#my_life").text(mylife)
    $("#com_life").text(comlife)
    return [mylife, comlife]
}
//最終的な勝ち負け
function final_judge(mylife, comlife) {
    if (mylife <= 0 && comlife <= 0) {
        $("footer").text("最終的には引き分けです")
        mylife = 100
        comlife = 100
    } else if (mylife <= 0) {
        $("footer").text("最終的にはあなたの負けです")
        mylife = 100
        comlife = 100
    } else if (comlife <= 0) {
        $("footer").text("最終的にはあなたの勝ちです")
        mylife = 100
        comlife = 100
    } else {
        $("footer").text("勝負中です")
        mylife = mylife
        comlife = comlife
    }
    return [mylife, comlife]
}

//モーダルウィンドウの設定
$(function () {
    $('.js-modal-open').each(function () {
        $(this).on('click', function () {
            var target = $(this).data('target');
            var modal = document.getElementById(target);
            $(modal).fadeIn();
            return false;
        });
    });
    $('.js-modal-close').on('click', function () {
        $('.js-modal').fadeOut();
        return false;
    });
});