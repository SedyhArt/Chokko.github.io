const modal = $("#modal");
const content = modal.find(".modal__content");

const validateFields = (form, fieldsArray) => {
  
  fieldsArray.forEach(field => {
    field.removeClass("input-error");
 
     if (field.val().trim() === "") {
       field.addClass("input-error");
     }
   })

   const errorFields = form.find(".input-error");

   return errorFields.length === 0;
}

$('.form').submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const isValid = validateFields(form, [name, phone, comment, to]);

  if (isValid) {
    $(".modal__content").removeClass("error-modal");

    $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val()
      },

      success: (data) => {
        content.text(data.message);

        $.fancybox.open({
          src: "#modal",
          type: "inline"
        })
      }, 
      error: (data) => {
        content.text(data.responseJSON.message);
        $(".modal__content").addClass("error-modal");

        $.fancybox.open({
          src: "#modal",
          type: "inline"
        })
      }
    })
  } 
  
  

})



$('.app-close-modal').click(e => {
  e.preventDefault();

  $.fancybox.close({
    src: "#modal",
    type: "inline"
  });
})