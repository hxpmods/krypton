
const shockWave= Effect(22, e =>{
    var col = Pal.lancerLaser;

    var fadeCol = col;
    fadeCol.a = Math.min(1.0,(e.fout()*2)+0.5);

    Draw.color(fadeCol);
    Lines.stroke(e.fout() * 10.0);
    Lines.poly(e.x, e.y, 24, 80.0 * e.fin());
    Lines.stroke(e.fout() * 8.0);
    Lines.poly(e.x, e.y, 18, 60.0 * e.fin());
    Lines.poly(e.x, e.y, 12, 40.0 * e.fin());
});

const rTurret = extend(BaseTurret,"knockback-turret", {
});

rTurret.buildType = () => extend(BaseTurret.BaseTurretBuild, rTurret,{

    reload: 100,
    reloadTime:100,
    strength: 20,
    canShoot: false,
    
    updateTile(){
        this.super$updateTile();
        this.reload += Time.delta;


        this.checkShoot()

        if(this.reload >= this.reloadTime){
            if(this.canShoot && this.cons.valid()){
            this.consume();
            this.shoot();
            }
            this.reload %= this.reloadTime;
        }
    },

    shoot(){
        var effect = shockWave;
        effect.at(this.x, this.y);
        Units.nearbyEnemies( this.team, this.x -rTurret.range , this.y -rTurret.range , rTurret.range*2, rTurret.range*2, e=>{
            e.impulseNet( Vec2( (e.x - this.x)* Time.delta*this.strength,(e.y - this.y)* Time.delta*this.strength))
        });
    },

    checkShoot(){
        this.canShoot = false
        Units.nearbyEnemies( this.team, this.x -rTurret.range , this.y -rTurret.range , rTurret.range*2, rTurret.range*2, e=>{
           this.canShoot = true
        })
    }

});