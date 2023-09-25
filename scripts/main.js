
const serpulo = Planets.serpulo
const erekir = Planets.erekir

const greenSpawnEffect = new Effect(20, e => {

    var inCol = Color(0.6,1.0,0.33);
    //inCol.a =0,8
    var outCol = inCol
    //outCol.a =0.2
    Draw.color(inCol,outCol, e.fin());

    Lines.stroke(e.fout() * 2);


    Lines.poly(e.x, e.y, 4, 5 + e.fin() * 12);
});


Events.on(ContentInitEvent, event => {
    var items =[Vars.content.item("krypton-iron"),Vars.content.item("krypton-kryptonite"),Vars.content.item("krypton-ice")]
    serpulo.hiddenItems.addAll(items)
    erekir.hiddenItems.addAll(items)


    //Vars.content.block("krypton-ice-packer").clearUnlock()
    //Vars.content.block("krypton-melter").clearUnlock()
    //Vars.content.block("krypton-crystalarium").clearUnlock()
    //Vars.content.block("krypton-ice-wall-k").clearUnlock()
    //Vars.content.block("krypton-magnetic-conveyor").clearUnlock()

    //print(Planets.krypton.techTree)
    var tree = Vars.content.planet("krypton-krypton").techTree

    Vars.content.block("krypton-crystalarium").craftEffect =greenSpawnEffect

    tree.each(n => n.content.clearUnlock())
    tree.each(n => n.reset())

  })