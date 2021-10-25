//option là obj truyền từ validator
//option.form: form element: form-1
// option.rule là mảng gồm các phần tử là các rule
// Các rule return lại selector và func test
// rule đc truyền vào validator -> option.rule là array gồm các phần tử ta tạo.
function Validator(option){
    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};
//     //Thực hiện validate
    function validate(inputElement, rule){
        // var errorMessage = rule.test(inputElement.value);
        var errorMessage;
        var errorElement = getParent(inputElement, option.formGroupSelector).querySelector(option.errorSelector);

        var rules = selectorRules[rule.selector];
        for(var i=0; i<rules.length; i++){
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }

        if(errorMessage){
            errorElement.innerText = errorMessage;
            getParent(inputElement, option.formGroupSelector).classList.add('invalid');
        }else{
            errorElement.innerText = '';
            getParent(inputElement, option.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    var formElement = document.querySelector(option.form);
    if(formElement){
        //xử lí submit
        formElement.onsubmit = function(e){
            e.preventDefault();
            var isFormValid=true;

            option.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if(!isValid){
                    isFormValid=false;
                }
            });
            
            if(isFormValid){
                if(typeof option.onSubmit === "function"){
                    var enableInput = formElement.querySelectorAll('input[name]:not([disabled])');
                    var formValues = Array.from(enableInput).reduce(function(value, input){
                        switch(input.type) {
                            case 'radio':
                                value[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    value[input.name] = '';
                                    return value;
                                }
                                if (!Array.isArray(value[input.name])) {
                                    value[input.name] = [];
                                }
                                value[input.name].push(input.value);
                                break;
                            case 'file':
                                value[input.name] = input.files;
                                break;
                            default:
                                value[input.name] = input.value;
                        }

                        return value;
                    }, {});
                    option.onSubmit(formValues);
                }
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
                // khi submit thành công lưu vào session và trả lại hành động submit
                // formElement.submit();
            }
        }
        option.rules.forEach(function(rule){
            // Luu rule trong input
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push[rule.test];
            }else{
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function (inputElement) {
                    //Xử lí trường hợp blur
                inputElement.onblur = function(){
                    validate(inputElement, rule);
                }

                //Xử lí khi đang gõ
                inputElement.oninput = function(){
                    var errorElement = getParent(inputElement, option.formGroupSelector).querySelector(option.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, option.formGroupSelector).classList.remove('invalid');
                }
            });
        });
    }
}
// định nghĩa các rules
// selector là đối số #name, #email đc truyền từ rule 
Validator.isRequired = function(selector){
    return {
        selector: selector,
        //value là value ng dùng nhập vào thẻ input
        test: function(value){
            return value ? undefined : "Vui lòng nhập trường này"
        }
    };
}

Validator.isEmail = function(selector){
    return {
        selector: selector,
        test: function(value){
            // var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Trường này phải là email"
        } 
    };
}
 
Validator.minlength = function(selector,min){
    return {
        selector: selector,
        test: function(value){
            return value.length >= min ? undefined : `Mật khẩu phải tối thiểu ${min} kí tự`
        } 
    };
}

Validator.isPhone = function(selector){
    return {
        selector: selector,
        test: function(value){
            var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            return phoneno.test(value) ? undefined : "Vui lòng nhập vào số điện thoại"
        } 
    };
}

Validator.isConfirmed = function(selector, getConfirmValue, message){
    return {
        selector: selector,
        test: function(value){
            return value === getConfirmValue() ? undefined : message||"Giá trị nhập vào không chính xác"
        }
    };
}