
const request = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
  });
};

// SINGLE URL SHORTENER

$('#single-form').submit((e) => {
  e.preventDefault();
  var baseURL = $('#base-url-short').val();
  const method = $('#method-short').val() === "SHORTEN" ? 'POST' : 'GET';
  const data = {};

  if (method === 'GET') {
    const path = $('#expandURL').val();
    console.log(path);
    baseURL = `${baseURL}/${path}`;
    console.log(baseURL);
  } else {
    baseURL = `${baseURL}/short`
    data.originalURL = $('#originalURL').val();
    console.log(data);
  }

  request(method, baseURL, data).then((res) => {
    console.log(res.json());
  }).catch((err) => {
    console.log(`ERROR:${err}`);
  })
})

$('#method-short').change(() => {
  const selectedMethod = $('#method-short').val();
  if (selectedMethod === "SHORTEN") {
    $('#expand-single').addClass('hidden');
    $('#shorten-single').removeClass('hidden');
  } else{
    $('#expand-single').removeClass('hidden');
    $('#shorten-single').addClass('hidden');
  }
})
