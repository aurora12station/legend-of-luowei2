//=============================================================================
// Pointerimage.js
/*:
 * @plugindesc Change the cursor.
 * @author Chiba Kunase.
 *
 * @help
 * place the cursor.cur in img folder.
 */
//=============================================================================
    Scene_Title.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
    document.getElementById('UpperCanvas').style.cursor='url(img/cursor.cur),auto';
    document.getElementById('ErrorPrinter').style.cursor='url(img/cursor.cur),auto';
};
