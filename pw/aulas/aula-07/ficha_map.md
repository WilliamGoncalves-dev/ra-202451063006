
 1  PRODUTOS.length                           // _10__
 2  const nomes = PRODUTOS.map(p => p.nome);  // _Mouse óptico, Teclado mecânico, Monitor 24",
                                              //  Headset com microfone, Cabo HDMI 2 m, SSD 480 GB, Webcam Full HD, Hub USB 4 portas, Monitor 27" 144 Hz, Mousepad grande_
 3  nomes.length                              // previsao: __10___
 4  nomes[0]                                  // __Mouse Óptico___
 5  
 6  PRODUTOS.map(p => p.preco * 2)[0]         // _189.80_
 7  PRODUTOS.map(p => `${p.nome}: R$ ${p.preco.toFixed(2)}`)[2] // _R$_899.00_________
 9  PRODUTOS.map(p => ({ id: p.id, dobro: p.preco * 2 }))[0] // __id: 1 preco 189.80_________
11  PRODUTOS.map(p => p.preco < 100)          // previsao: _true, false, false, false, true, false, false, true, false, true__
12  PRODUTOS.map(p => { p.nome })        // _undefined, undefined, undefined..._  <- ARMADILHA
13  PRODUTOS[0].nome                          // mudou? _Não, continua sendo 'Mouse Óptico'__
