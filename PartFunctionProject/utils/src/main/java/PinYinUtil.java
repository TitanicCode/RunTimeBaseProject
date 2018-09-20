import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

/**
 * Created by user on 2018/9/18.
 */
public class PinYinUtil {

    /**
     * 根据指定汉语转化为拼音
     * @param str
     * @return
     */
    public static String getPinYin(String str) {
        HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
        format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        format.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        format.setVCharType(HanyuPinyinVCharType.WITH_V);

        String rStr = "";
        char[] chars = str.trim().toCharArray();
        for (int i = 0; i < chars.length; i++) {
            if(String.valueOf(chars[i]).matches("[\u4e00-\u9fa5]+")) {//中文字符
                try {
                    rStr += PinyinHelper.toHanyuPinyinStringArray(chars[i],format)[0];
                } catch (BadHanyuPinyinOutputFormatCombination e) {
                    e.printStackTrace();
                }
            }else {
                rStr += chars[i];
            }
        }
        rStr=rStr.replaceAll("\\(|\\)|\\'|\\#|\\$|\\%|\\^|\\&|\\*|\\/|\\?|\\\\|\\（|\\）", "");
        return rStr;
    }

}
