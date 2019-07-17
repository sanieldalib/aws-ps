
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
  } else {
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
});

//BOOKMARK SERVICE

$('#bookmark-add-btn').click(() => {
  $('#titles').append('<input type="text" class="form-control input-batch" placeholder="link-title">');
  $('#links').append('<input type="text" class="form-control input-batch" placeholder="https://www.google.com/example">');
})

$('#bookmark-form').submit(e => {
  e.preventDefault();
  const baseURL = $('#base-url-bookmark').val() + '/bookmark';
  const title = $('#bookmark-title').val();
  const getTitle = $('#getTitle').val();
  const titles = getInputs($('#titles > input'));
  const urls = getInputs($('#links > input'));

  const links = urls.map((item, i) => {
    return {
      title: titles[i],
      url: item
    }
  });

  const selectedMethod = $('#method-bookmark').val();

  if (selectedMethod === "GET") {
    request('GET', `${baseURL}/${getTitle}`).then(response => {
      return response.json();
    }).then(res => {
      console.log(res);
      document.getElementById("bookmark-output").innerHTML = JSON.stringify(res, undefined, 2);
    })
  } else {
    request('POST', baseURL, { title: title, links: links}).then(response => {
      return response;
    }).then(res => {
      console.log();
      document.getElementById("bookmark-output").innerHTML = `This endpoint does not return a body. \nStatus Code: ${res.status}`;
    })
  }
});

$('#method-bookmark').change(() => {
  const selectedMethod = $('#method-bookmark').val();
  if (selectedMethod === "GET") {
    $('#create-bookmark').addClass('hidden');
    $('#get-bookmark').removeClass('hidden');
  } else {
    $('#create-bookmark').removeClass('hidden');
    $('#get-bookmark').addClass('hidden');
  }
})
