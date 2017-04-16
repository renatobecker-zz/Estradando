<?php 

namespace App\Classes;
class Helpers {

    const ACCENT_STRINGS = 'ŠŒŽšœžŸ¥µÀÁÂÃÄÅÆÇÈÉÊËẼÌÍÎÏĨÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëẽìíîïĩðñòóôõöøùúûüýÿ';
    const NO_ACCENT_STRINGS = 'SOZsozYYuAAAAAAACEEEEEIIIIIDNOOOOOOUUUUYsaaaaaaaceeeeeiiiiionoooooouuuuyy';    
    
    public static function accentToRegex($text) {

        $from = str_split(utf8_decode(self::ACCENT_STRINGS));
        $to   = str_split(strtolower(self::NO_ACCENT_STRINGS));
        $text = utf8_decode($text);
        $regex = array();
        foreach ($to as $key => $value) {
            if (isset($regex[$value])) {
                $regex[$value] .= $from[$key];
            } else {
                $regex[$value] = $value;
            }
        }
        foreach ($regex as $rg_key => $rg) {
            $text = preg_replace("/[$rg]/", "_{$rg_key}_", $text);
        }
        
        foreach ($regex as $rg_key => $rg) {
            $text = preg_replace("/_{$rg_key}_/", "[$rg]", $text);
        }

        return utf8_encode($text);        
    } 

    public static function clear_text( $text ) {

        return preg_replace( '/[`^~\'"]/', null, iconv( 'UTF-8', 'ASCII//TRANSLIT', $text ) ); 
    }    

    public static function isValidMd5($md5 ='') {
    
        return preg_match('/^[a-f0-9]{32}$/', $md5);
    }    

    public static function isValidMongoID($mongoID ='') {
    
        return preg_match('/^[a-f0-9]{24}$/', $mongoID);
    }  

    public static function convertToMongoDate($strDate) {
        if (is_null($strDate)) return;

        $date = str_replace('/', '-', $strDate);                       
        return new \MongoDB\BSON\UTCDateTime(strtotime($date));
    }

}