require("codemirror");
require("codemirror/mode/javascript/javascript");

var _ = require("underscore");

var editor = CodeMirror.fromTextArea(document.getElementById("lock_code"), {
	mode: "javascript"
, lineNumbers: true
});

editor.markText({line:0,ch:0}, {line:1,ch:null}, {className: "readonly", atomic: true, readOnly: true, inclusiveLeft: true, inclusiveRight: true});
editor.markText({line:7,ch:0}, {line:8,ch:null}, {className: "readonly", atomic: true, readOnly: true, inclusiveLeft: true, inclusiveRight: true});

window.Editor = editor;

var locks = [
	document.getElementById("lock1")
, document.getElementById("lock2")
, document.getElementById("lock3")
, document.getElementById("lock4")
];

locks.forEach(function (lock){
	lock.addEventListener('click', function (event){
		if (this.classList.contains("selected")){
			this.classList.remove("selected");
		}
		else {
			this.classList.add("selected");
		}
	})
});

window.Locks = locks;

var clear = document.getElementById("clear");

clear.addEventListener('click', function (event){
	var history = document.getElementById("history_ol");

	while(history.children.length > 0){
		history.removeChild(history.lastChild);
	}
});

var handle = document.getElementById("handle");

handle.addEventListener('click', function (event){
	//get lock status
	var lock_status = _(locks).map(function (lock){
		return lock.classList.contains("selected");
	});

	var correct_combination;

	try {
    eval(editor.getValue());
	} catch (e) {
    if (e instanceof SyntaxError) {
      alert("Your locking logic has a syntax error.");
      return;
    }
	}

	if (typeof correct_combination !== "function"){
		correct_combination = function (){return false};
	}

	var success = correct_combination.apply(null, lock_status);

	var entry = document.createElement("li");
	lock_status.forEach(function (lock, index){
		var status = document.createElement("div");
		status.innerHTML = index+1;
		status.classList.add("lock");
		status.classList.add("mini");
		if (lock){
			status.classList.add("selected");
		}
		entry.appendChild(status);
	});
	
	var result_div = document.createElement("div");
	result_div.classList.add("handle");
	result_div.classList.add("mini");

	if (success){
		result_div.innerHTML = "Yes";
		result_div.classList.add("yes");
	}
	else {
		result_div.innerHTML = "No";
		result_div.classList.add("no");
	}

	entry.appendChild(result_div);

	var history = document.getElementById("history_ol");

	while (history.children.length > 5){
		history.removeChild(history.lastChild);
	}

	if (history.firstChild){
		history.insertBefore(entry, history.firstChild);
	}
	else {
		history.appendChild(entry);
	}

});