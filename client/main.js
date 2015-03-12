'use strict';

$(document).ready(function() {
  var myDataRef = new Firebase('https://tommy-to-do-list.firebaseio.com/');
  var count = 0;
  var idArr = [];

  myDataRef.on('child_added', function(data) {
    // console.log(data.val());
    var showData = data.val();
    showTask(showData.title, showData.duedate, showData.priorities, showData.isComplete);
    // console.log(data.name());
    idArr.push(data.name());

    function showTask(title, duedate, priorities, isComplete) {
      $('#tbody').append(
        '<tr id="row' + count + '">' +
        '<td class="title">' + title + '</td>' +
        '<td class="dates">' + duedate + '</td>' +
        '<td class="prio">' + priorities + '</td>' +
        '<td id="checkdone">' + isComplete + '</td>' +
        '<td><button id="complete' + count++ + '" class="check">Complete</button></td>' +
        '</tr>'
      );

      if (isComplete === 'Yes') {
        $('#row' + (count - 1) + ' .title').css('text-decoration', 'line-through');
        $('#row' + (count - 1) + ' .dates').css('text-decoration', 'line-through');
        $('#row' + (count - 1) + ' .prio').css('text-decoration', 'line-through');
      }
    }

    $('.check').off().on('click', function() {
      var pick = ($(this).attr('id').slice(-1));
      $('#row' + pick + ' #checkdone').text('Yes');
      $('#row' + pick + ' .title').css('text-decoration', 'line-through');
      $('#row' + pick + ' .dates').css('text-decoration', 'line-through');
      $('#row' + pick + ' .prio').css('text-decoration', 'line-through');
      // $('#row' + pick).remove();
      var idRef = myDataRef.child(idArr[pick]);
      idRef.update({
        isComplete: 'Yes'
      });
    });
  });

  $('#save').click(function() {
    var title = $('#title').val();
    var date = $('#duedate').val();
    var priority = $('#priority').val();
    // console.log(title, date, priority);
    myDataRef.push(
      {title: title,
        duedate: date,
        priorities: priority,
        isComplete: 'No'
      });
    $('#title').val('');
    $('#duedate').val('');

  });
});
