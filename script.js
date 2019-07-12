
const request = (method, url, data) => {
  return $.ajax({
    url: url,
    method: method,
    data: data,
    dataType : 'jsonp'
  });
};

// SINGLE URL SHORTENER

$('#single-form').submit((e) => {
  e.preventDefault();
  var baseURL = $('#base-url-short').val();
  const method = $('#method-short').val() === "SHORTEN" ? 'POST' : 'GET';

  if (method === 'GET') {
    const path = $('#expandURL').val();
    console.log(path);
    baseURL = `${baseURL}/${path}`;
    console.log(baseURL);
  }

  request(method, baseURL).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
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
