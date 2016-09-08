// 显示NPC名字
function npcName() {
    this.initialize.apply(this, arguments);
};

npcName.prototype.initialize = function() {

        this._PlayerColor = '#ffea00';  //主角的名字颜色

        this._eventsName = [];
        this._Player = new Sprite();
        this._Player.bitmap = new Bitmap(300, 100);
        // 处理事件name
        var k = 0;
        for(var i=0;i<$dataMap.events.length;i++){
                if($dataMap.events[i]){
                        this._eventsName[k] = new Sprite();
                        this._eventsName[k].id = $dataMap.events[i].id;
                        this._eventsName[k].name = $dataMap.events[i].name.split('@')[0];
                        this._eventsName[k].bitmap = new Bitmap(300, 100);
                        this._eventsName[k].textW = this._eventsName[k].bitmap.measureTextWidth(this._eventsName[k].name);
                        if($dataMap.events[i].name.split('@').length > 1){
                                this._eventsName[k].bitmap.textColor = $dataMap.events[i].name.split('@')[1];
                        };
                        this._eventsName[k].bitmap.drawText(this._eventsName[k].name, 0, 0,this._eventsName[k].textW , 24, 'center');
                        k++;
                };
        };

        this._Player.textW = this._Player.bitmap.measureTextWidth($gameActors.actor(1).name());
        this._Player.bitmap.textColor = this._PlayerColor;
        this._Player.bitmap.drawText($gameActors.actor(1).name(), 0, 0,this._Player.textW, 24, 'center');
};


npcName.prototype.update = function (){

        for(var i=0;i<this._eventsName.length;i++){
                this._eventsName[i].x = $gameMap.event(this._eventsName[i].id)._realX*48-$gameMap._displayX*48- this._eventsName[i].textW/2+24;
                this._eventsName[i].y = $gameMap.event(this._eventsName[i].id)._realY*48-$gameMap._displayY*48-24;
        };

        this._Player.x = $gamePlayer._realX*48-$gameMap._displayX*48- this._Player.textW/2+24;
        this._Player.y = $gamePlayer._realY*48-$gameMap._displayY*48-24;

};

npcName.prototype.go = function (){
        for(var i=0;i<this._eventsName.length;i++){
                this.scene.addChild(this._eventsName[i]);
        };
        this.scene.addChild(this._Player);
};

var i = Scene_Map.prototype.createCustom.length;
Scene_Map.prototype.createCustom[i] = function () {

        this.npcName = new npcName();
        this.npcName.scene = this;
        this.npcName.go();
        console.log($gameMap);
};

Scene_Map.prototype.update2 = Scene_Map.prototype.update;
Scene_Map.prototype.update = function (){
        this.update2();
        this.npcName.update();
};
