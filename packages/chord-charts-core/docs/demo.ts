import { ChordChart } from '../src/index';

function createKeySelect() {
  let keys = ChordChart.getAllKeys();
  let selectEl = document.createElement('select');

  for(let key of keys) {
    let option = document.createElement('option');
    option.value = key.name;
    option.text = key.name;
    selectEl.appendChild(option);
  }

  return selectEl;
}

function onTextChanged(el) {
  return function(event) {
    el.$chordChart.setText(event.target.innerText);
  }
}

function onKeyChanged(chordChartEl) {
  return function (event) {
    let newKey = event.target.value;
    chordChartEl.$chordChart.transpose(newKey);

    chordChartEl.innerText = chordChartEl.$chordChart.asText();
  }
}

function initDom() {
  let chordChartEls: any = Array.from(document.querySelectorAll('.chord-chart'));
  for (let chordChartEl of chordChartEls) {
    let key = chordChartEl.dataset.key;
    chordChartEl.$chordChart = new ChordChart(chordChartEl.innerText, key);
    chordChartEl.innerText = chordChartEl.$chordChart.asText();

    let parentElement = chordChartEl.parentElement;
    parentElement.removeChild(chordChartEl);
    let containerDiv = document.createElement('div');
    let input = createKeySelect();
    input.value = key;
    input.onchange = onKeyChanged(chordChartEl);

    
    chordChartEl.addEventListener('input', onTextChanged(chordChartEl));


    containerDiv.appendChild(input);
    containerDiv.appendChild(chordChartEl);
    parentElement.appendChild(containerDiv);
  }
}

function init() {
  initDom();
}

init();