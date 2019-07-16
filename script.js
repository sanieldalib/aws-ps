
//UTILITY FUNCTIONS
const request = async (method, url, data) => {
  const params = {
    method: method,
    headers: {'Content-Type': 'text/plain'},
    redirect: "manual"
  }

  if (method === 'POST') {
    params.body = JSON.stringify(data);
  }

  return await fetch(url, params);
};

const getInputs = (inputFields) => {
  var inputs = [];
  inputFields.each(function() {
    const url = $(this).val();
    if (url !== "") { inputs.push($(this).val()); }
  });

  return inputs;
}


//SINGLE URL SHORTENER
$('#single-form').submit((e) => {
  e.preventDefault();
  var baseURL = $('#base-url-short').val();
  const method = $('#method-short').val() === "SHORTEN" ? 'POST' : 'GET';
  const data = {};

  if (method === 'GET') {
    const path = $('#expandURL').val();
    console.log(path);
    baseURL = `${baseURL}/${path}`;
    window.open(baseURL, '_blank');
  } else {
    baseURL = `${baseURL}/short`
    data.originalURL = $('#originalURL').val();
    request(method, baseURL, data).then(response => {
      return response.json();
    }).then(res => {
      document.getElementById("single-output").innerHTML = JSON.stringify(res, undefined, 2);
    });
  }
});

$('#method-short').change(() => {
  const selectedMethod = $('#method-short').val();
  if (selectedMethod === "SHORTEN") {
    $('#expand-single').addClass('hidden');
    $('#shorten-single').removeClass('hidden');
  } else{
    $('#expand-single').removeClass('hidden');
    $('#shorten-single').addClass('hidden');
  }
});

//BATCH URL SHORTENER

$('#batch-add-shorten').click(() => {
  $('#shorten-batch').append('<input type="text" class="form-control input-batch" placeholder="https://www.google.com/example">');
});

$('#batch-add-expand').click(() => {
  $('#expand-batch').append('<input type="text" class="form-control input-batch" placeholder="https://www.google.com/example">');
});

$('#method-batch').change(() => {
  const selectedMethod = $('#method-batch').val();
  if (selectedMethod === "SHORTEN") {
    $('#expand-batch').addClass('hidden');
    $('#shorten-batch').removeClass('hidden');
  } else{
    $('#expand-batch').removeClass('hidden');
    $('#shorten-batch').addClass('hidden');
  }
});

$('#batch-form').submit(e => {
  e.preventDefault();
  var baseURL = $('#base-url-batch').val()+'/shrink';
  const inputs = getInputs($('#shorten-batch > input'));

  request('POST', baseURL, {'urls': inputs}).then(response => {
    return response.json();
  }).then(res => {
    document.getElementById("batch-output").innerHTML = JSON.stringify(res, undefined, 2);
  })


  console.log(inputs);


});
