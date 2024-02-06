const progress = document.getElementById('progress')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const circles = document.querySelectorAll('.circle')

let currentActive = 1

// Kullanıcı "Next" butonuna tıkladığında, currentActive değişkeni artırılır (increment).Eğer currentActive değeri, toplam daire sayısından (circles.length) büyük olursa, kullanıcı son adımda demektir ve currentActive tekrar toplam daire sayısına eşitlenir. Bu, kullanıcının mevcut adımların ötesine geçmesini engeller.update() fonksiyonu çağrılır, bu da arayüzdeki görsel değişiklikleri tetikler. 
next.addEventListener('click',() => {
    currentActive++

    if(currentActive > circles.length) {
        currentActive = circles.length
    }

    update()
})

//Kullanıcı "Prev" butonuna tıkladığında, currentActive değişkeni azaltılır (decrement). Eğer currentActive değeri 1'den küçük olursa, kullanıcı ilk adımda demektir ve currentActive tekrar 1'e eşitlenir. Bu, kullanıcının mevcut adımların altına düşmesini engeller. update() fonksiyonu çağrılır, bu da arayüzdeki görsel değişiklikleri tetikler.
prev.addEventListener('click',() => {
    currentActive--

    if(currentActive < 1) {
        currentActive = 1
    }

    update()
})

//update() fonksiyonu, kullanıcının hangi adımda olduğuna bağlı olarak UI'da bir dizi güncelleme gerçekleştirir.Tüm daireler üzerinde döngü yapılır. Eğer dairenin index'i (idx) currentActive değerinden küçükse, bu daire aktif olarak işaretlenir. Değilse, aktif işareti kaldırılır.
function update () {
    circles.forEach( (circle, idx)=> {
        if (idx < currentActive) {
            circle.classList.add('active')
        } else {
            circle.classList.remove('active')
        }
    })

    const actives = document.querySelectorAll('.active')

    //Aktif dairelerin sayısını hesaplayarak ilerleme çubuğunun genişliğini günceller. İlerleme çubuğunun genişliği, aktif dairelerin oranına bağlı olarak yüzde cinsinden ayarlanır.
    progress.style.width = (actives.length -1) / (circles.length -1) * 100 + '%'

    //Eğer currentActive değeri 1 ise, "Prev" butonu devre dışı bırakılır. Eğer currentActive değeri toplam daire sayısına eşitse, "Next" butonu devre dışı bırakılır. Diğer durumlarda, her iki buton da etkinleştirilir.
    if (currentActive === 1) {
        prev.disabled = true
    } else if (currentActive === circles.length) {
        next.disabled = true
    } else {
        prev.disabled = false
        next.disabled = false
    }
}