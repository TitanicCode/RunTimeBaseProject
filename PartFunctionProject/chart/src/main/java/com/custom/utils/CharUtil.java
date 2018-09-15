package com.custom.utils;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtilities;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.StandardChartTheme;
import org.jfree.chart.axis.*;
import org.jfree.chart.labels.StandardPieSectionLabelGenerator;
import org.jfree.chart.plot.CategoryPlot;
import org.jfree.chart.plot.PiePlot;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.plot.XYPlot;
import org.jfree.chart.renderer.category.BarRenderer3D;
import org.jfree.chart.renderer.xy.XYLineAndShapeRenderer;
import org.jfree.chart.title.TextTitle;
import org.jfree.data.category.CategoryDataset;
import org.jfree.data.category.DefaultCategoryDataset;
import org.jfree.data.general.DefaultPieDataset;
import org.jfree.data.general.PieDataset;
import org.jfree.data.jdbc.JDBCPieDataset;
import org.jfree.data.time.Month;
import org.jfree.data.time.TimeSeries;
import org.jfree.data.time.TimeSeriesCollection;
import org.jfree.data.xy.XYDataset;
import org.jfree.ui.VerticalAlignment;

import javax.imageio.ImageIO;
import java.awt.*;
import java.io.IOException;
import java.text.DateFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Properties;
import java.util.Random;

/**
 * Created by user on 2018/9/11.
 * ChartUtil类是一个自定义的制图工具类,
 * 其中createDataSet()方法用于创建柱形图所需要的数据集合，它返回CategoryDataset对象。
 * CreateChart()用于创建制图对象JFreeChart，在此方法中通过ChartFactory对象的createBarChart3D()方法创建一个3D效果的柱形图对象，并将其返回。
 * 该类中还涉及到了整合数据库，通过查询数据库来初始化数据集合
 */
public class CharUtil {

    /******************简单的柱状图小Demo********************/
//    //创建数据集合
//    public static CategoryDataset createDataSet(){
//        DefaultCategoryDataset dataSet=new DefaultCategoryDataset();  //实例化DefaultCategoryDataset对象
//        dataSet.addValue(500, "JAVA图书", "J2SE类"); //向数据集合中添加数据
//        dataSet.addValue(100, "JAVA图书", "JAVAME类");
//        dataSet.addValue(900, "JAVA图书", "J2EE类");
//        return dataSet;
//    }
//    //创建JFreeChart 对象
//    public static JFreeChart createChart (){
//        StandardChartTheme standardChartTheme=new StandardChartTheme("CN"); //创建主题样式
//        standardChartTheme.setExtraLargeFont(new Font("隶书",Font.BOLD,20)); //设置标题字体
//        standardChartTheme.setRegularFont(new Font("宋体",Font.PLAIN,15)); //设置图例的字体
//        standardChartTheme.setLargeFont(new Font("宋体", Font.PLAIN, 15));          //设置轴向的字体
//        ChartFactory.setChartTheme(standardChartTheme);    //设置主题样式
//        //通过ChartFactory 创建JFreeChart
//        JFreeChart chart = ChartFactory.createBarChart3D(
//                "JAVA图书销量统计",                    //图表标题
//                "JAVA图书",                           //横轴标题
//                "销量（本）",                        //纵轴标题
//                createDataSet(),                       //数据集合
//                PlotOrientation.VERTICAL,      //图表方向
//                false,                               //是否显示图例标识
//                false,                               //是否显示tooltips
//                false);                              //是否支持超链接
//        return chart;
//    }

    /******************通过图表相关属性设置优化后的柱状图********************/

//    //创建数据集合
//    public static CategoryDataset createDataSet() {
//        //实例化DefaultCategoryDataset对象
//        DefaultCategoryDataset dataSet = new DefaultCategoryDataset();
//        //添加第一季度数据
//        dataSet.addValue(6000, "第一季度", "J2SE类");
//        dataSet.addValue(3000, "第一季度", "J2ME类");
//        dataSet.addValue(12000, "第一季度", "J2EE类");
//        //添加第二季度数据
//        dataSet.addValue(8000, "第二季度", "J2SE类");
//        dataSet.addValue(4000, "第二季度", "J2ME类");
//        dataSet.addValue(6000, "第二季度", "J2EE类");
//        //添加第三季度数据
//        dataSet.addValue(5000, "第三季度", "J2SE类");
//        dataSet.addValue(4000, "第三季度", "J2ME类");
//        dataSet.addValue(8000, "第三季度", "J2EE类");
//        //添加第四季度数据
//        dataSet.addValue(8000, "第四季度", "J2SE类");
//        dataSet.addValue(2000, "第四季度", "J2ME类");
//        dataSet.addValue(9000, "第四季度", "J2EE类");
//        return dataSet;
//    }
//
//    //创建JFreeChart 对象
//    public static JFreeChart createChart() {
//        //通过ChartFactory创建JFreeChart
//        JFreeChart chart = ChartFactory.createBarChart3D(
//                "JAVA图书销量统计",           //图表标题
//                "JAVA图书",                   //横轴标题
//                "销量（本）",                //纵轴标题
//                createDataSet(),            //数据集合
//                PlotOrientation.VERTICAL,   //图表方向
//                true,                       //是否显示图例标识
//                false,                      //是否显示tooltips
//                false);                     //是否支持超链接
//        //背景图片
//        Image image = null;
//        //File file = new File("/image/test.jpg");
//        try {
//            //创建背景图片
//            //image = ImageIO.read(file);
//            image = ImageIO.read(CharUtil.class.getResource("/image/test.jpg"));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        //设置标题字体
//        chart.getTitle().setFont(new Font("隶书",Font.BOLD,25));
//        //设置图例类别字体
//        chart.getLegend().setItemFont(new Font("宋体",Font.PLAIN,12));
//        chart.setBorderVisible(true);   //设置显示边框
//        //实例化TextTitle对象
//        TextTitle subTitle = new TextTitle("2009年Java类图书全国销量统计（J2SE、J2ME、J2EE）");
//        //设置居中显示
//        subTitle.setVerticalAlignment(VerticalAlignment.BOTTOM);
//        chart.addSubtitle(subTitle);    //添加子标题
//        //获取绘图区对象
//        CategoryPlot plot = chart.getCategoryPlot();
//        plot.setForegroundAlpha(0.8F);  //设置绘图区前景色透明度
//        plot.setBackgroundAlpha(0.5F);  //设置绘图区背景色透明度
//        plot.setBackgroundImage(image); //设置绘图区背景图片
//        //获取坐标轴对象
//        CategoryAxis categoryAxis = plot.getDomainAxis();
//        //设置坐标轴标题字体
//        categoryAxis.setLabelFont(new Font("宋体",Font.PLAIN,12));
//        //设置坐标轴标尺值字体
//        categoryAxis.setTickLabelFont(new Font("宋体",Font.PLAIN,12));
//        //设置坐标轴标题旋转角度
//        categoryAxis.setCategoryLabelPositions(CategoryLabelPositions.UP_45);
//        //获取数据轴对象
//        ValueAxis valueAxis = plot.getRangeAxis();
//        //设置数据轴字体
//        valueAxis.setLabelFont(new Font("宋体",Font.PLAIN,12));
//        //获取图片渲染对象
//        BarRenderer3D renderer = new BarRenderer3D();
//        renderer.setItemMargin(0.32);   //设置柱子间的间距
//        plot.setRenderer(renderer);     //设置图片渲染对象
//        return chart;
//    }

    /******************通过查询数据库并初始化数据集合********************/
    //initPieData()方法用于创建数据集合对象，在此方法中，使用JDBCPieDataset类通过JDBC查询数据库获取数据集合对象。
    //PiePlot类的setLabelGenerator()方法用于设置分类标签的格式，其参数为StandardPieSectionLabelGenerator对象，此对象的入口参数”{0}={2}”用于指定类别名称及所占有的百分比，{0}代表类别名称，{2 }代表百分比。
    public static PieDataset initPieData() throws IOException {

        Properties jdbcPros = PropertiesUtill.getpros("db.properties");

        String driverName = jdbcPros.getProperty("jdbc.driverClass");
        String url = jdbcPros.getProperty("jdbc.jdbcUrl");
        String user = jdbcPros.getProperty("jdbc.user");
        String password = jdbcPros.getProperty("jdbc.password");

        JDBCPieDataset dataset = null;                                          //JDBC数据集合
        try {
            //创建了JDBCPieDataset 对象后，可以通过executeQuery()方法查询数据库，其入口参数为String类型的SQL语句，执行此方法后，将返回拥有数据的数据集合对象。
            dataset = new JDBCPieDataset(url, driverName, user, password); // 通过JDBC创建数据集合
            String query = "select category,val from tb_shop";  // SQL语句
            dataset.executeQuery(query);                             // 查询并向数据集合中添加数据
            dataset.close();                                             //关闭数据库连接
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dataset;
    }
    //创建饼形图实例
    public static JFreeChart createChart() throws IOException {
        // 创建3D饼型图表
        JFreeChart chart = ChartFactory.createPieChart3D(
                "XX商城月销量统计",     // 图表的标题
                initPieData(),             // 饼形图的数据集对象
                true,                       // 是否显示图例
                true,                       // 是否显示提示文本
                false);                     // 是否生成超链接
        chart.getTitle().setFont(new Font("隶书", Font.BOLD, 25));         //设置标题字体
        chart.getLegend().setItemFont(new Font("宋体", Font.BOLD, 15)); //设置图例类别字体
        PiePlot plot = (PiePlot) chart.getPlot();                                      // 获得绘图区对象
        plot.setForegroundAlpha(0.5f);                                                // 设置前景透明度
        plot.setLabelFont(new Font("宋体", Font.PLAIN, 12));         // 设置分类标签的字体
        plot.setCircular(true);     // 设置饼形为正圆
        // 设置分类标签的格式
        plot.setLabelGenerator(new StandardPieSectionLabelGenerator("{0}={2}",
                NumberFormat.getNumberInstance(),
                NumberFormat.getPercentInstance()));
        return chart;
    }

//    /******************绘制饼状图********************/
//    private static PieDataset createDataset(){
//        DefaultPieDataset dataset = new DefaultPieDataset();                        //创建饼图的数据集合
//        dataset.setValue("One", new Double(43.200000000000003D));           //向数据集合中添加数据
//        dataset.setValue("Two", new Double(10.0D));
//        dataset.setValue("Three", new Double(20.5D));
//        dataset.setValue("Four", new Double(14.5D));
//        dataset.setValue("Five", new Double(11.0D));
//        return dataset;                                                                 //返回数据集合
//    }
//    public static JFreeChart createChart(){
//        JFreeChart jfreeChart = ChartFactory.createPieChart("饼状图", createDataset(), true, true, false); //创建JFreeChart对象
//        TextTitle localTextTitle = jfreeChart.getTitle();             //获取标题
//        localTextTitle.setFont(new Font("宋体",0,15));           //标题字体样式
//        PiePlot localPiePlot = (PiePlot)jfreeChart.getPlot();       //获取绘图区对象
//        localPiePlot.setLabelFont(new Font("宋体", 0, 12));     //设置分类标签的字体
//        localPiePlot.setCircular(false);                             //设置饼图是否一定是正圆
//        return jfreeChart;
//    }

    /******************绘制柱状图********************/
//    private static CategoryDataset createDataset(){
//        DefaultCategoryDataset dataset = new DefaultCategoryDataset();//创建柱状图数据集合对象
//        dataset.setValue(4.4D, "", "大米");//填充数据
//        dataset.setValue(2.0D, "", "玉米");//填充数据
//        dataset.setValue(5.8D, "", "小麦");//填充数据
//        dataset.setValue(1.0D, "", "高粱");//填充数据
//        dataset.setValue(5.8D, "", "黄豆");//填充数据
//        return dataset;
//    }
//    public static JFreeChart createChart(){
//        StandardChartTheme standardChartTheme = new StandardChartTheme("CN");  //创建主题样式
//        standardChartTheme.setExtraLargeFont(new Font("隶书", Font.BOLD, 20));    //设置标题字体
//        standardChartTheme.setRegularFont(new Font("宋体", Font.PLAIN, 15));        //设置图例的字体
//        standardChartTheme.setLargeFont(new Font("宋体", Font.PLAIN, 15));          //设置轴向的字体
//        ChartFactory.setChartTheme(standardChartTheme);                                 //设置主题样式
//        JFreeChart chart = ChartFactory.createBarChart(
//                "粮食价格对比图",        //标题
//                "粮食",                          //横轴标题
//                "价格（每公斤）",         //纵轴标题
//                createDataset(),               //数据集合
//                PlotOrientation.VERTICAL, //图表方向
//                false,                      //是否显示图例标识
//                false,                      //是否显示toolTips
//                false);                      //是否生成超链接
//        return chart;
//    }

    /******************绘制折线图********************/
//    public static JFreeChart createChart(){
//        StandardChartTheme standardChartTheme = new StandardChartTheme("CN");  //创建主题样式
//        standardChartTheme.setExtraLargeFont(new Font("隶书", Font.BOLD, 20));    //设置标题字体
//        standardChartTheme.setRegularFont(new Font("宋体", Font.PLAIN, 15));        //设置图例的字体
//        standardChartTheme.setLargeFont(new Font("宋体", Font.PLAIN, 15));          //设置轴向的字体
//        ChartFactory.setChartTheme(standardChartTheme);                                 //设置主题样式
//        JFreeChart chart = ChartFactory.createXYLineChart(
//                "房价走势对比图",                //标题
//                "年份",                                 //横轴标题
//                "价格（每平米）",                //纵轴标题
//                createDataset(),                      //数据集合
//                PlotOrientation.VERTICAL,    //图表方向
//                true,                              //是否显示图例标识
//                true,                              //是否显示toolTips
//                false);                             //是否生成超链接
//        XYPlot localXYPlot = (XYPlot)chart.getPlot();    //获取折线数据区的Plot对象
//        //获取折线数据区的数据点对象
//        XYLineAndShapeRenderer localXYLineAndShapeRenderer = (XYLineAndShapeRenderer)localXYPlot.getRenderer();
//        localXYLineAndShapeRenderer.setBaseShapesVisible(true);        //设置连接点为可见状态
//        NumberAxis xAxis=(NumberAxis)localXYPlot.getDomainAxis();       //获取X轴
//        xAxis.setStandardTickUnits(NumberAxis.createIntegerTickUnits());  //设置X轴数据为整型
//        NumberAxis yAxis = (NumberAxis)localXYPlot.getRangeAxis();       //获取Y轴
//        yAxis.setStandardTickUnits(NumberAxis.createIntegerTickUnits());  //设置Y轴的数据为整型
//        return chart;
//    }

    /******************生成区域图表********************/
//    private static CategoryDataset createDataset(){
//        DefaultCategoryDataset dataset = new DefaultCategoryDataset();
//        dataset.addValue(12.2D, "苹果", "3月份");
//        dataset.addValue(11.1D, "苹果", "4月份");
//        dataset.addValue(13.6D, "苹果", "5月份");
//        dataset.addValue(8.3D, "苹果",  "6月份");
//        dataset.addValue(9.6D, "苹果",  "7月份");
//        dataset.addValue(9.2D, "香蕉", "3月份");
//        dataset.addValue(8.4D, "香蕉", "4月份");
//        dataset.addValue(7.6D, "香蕉", "5月份");
//        dataset.addValue(7.9D, "香蕉",  "6月份");
//        dataset.addValue(5.5D, "香蕉",  "7月份");
//        dataset.addValue(7.6D, "西瓜", "3月份");
//        dataset.addValue(7.8D, "香蕉", "4月份");
//        dataset.addValue(7.0D, "香蕉", "5月份");
//        dataset.addValue(5.5D, "香蕉",  "6月份");
//        dataset.addValue(1.5D, "香蕉",  "7月份");
//        return dataset;
//    }
//    public static JFreeChart createChart(){
//        StandardChartTheme standardChartTheme = new StandardChartTheme("CN");  //创建主题样式
//        standardChartTheme.setExtraLargeFont(new Font("隶书", Font.BOLD, 20));    //设置标题字体
//        standardChartTheme.setRegularFont(new Font("宋体", Font.PLAIN, 15));        //设置图例的字体
//        standardChartTheme.setLargeFont(new Font("宋体", Font.PLAIN, 15));          //设置轴向的字体
//        ChartFactory.setChartTheme(standardChartTheme);                                 //设置主题样式
//        JFreeChart chart = ChartFactory.createAreaChart(
//                "水果价格区域图",                //标题
//                "水果",                                 //横轴标题
//                "价格（每公斤）",                //纵轴标题
//                createDataset(),                      //数据集合
//                PlotOrientation.VERTICAL,    //图表方向
//                true,                              //是否显示图例标识
//                true,                       //是否显示toolTips
//                false);                      //是否生成超链接
//        CategoryPlot plot = (CategoryPlot)chart.getPlot();                      //获取数据区的图表对象
//        plot.setDomainGridlinesVisible(true);                                                //设置显示网格
//        plot.setForegroundAlpha(0.6f);                                                        //设置图表透明度
//        NumberAxis numberaxis = (NumberAxis)plot.getRangeAxis();            //获取Y轴
//        numberaxis.setStandardTickUnits(NumberAxis.createIntegerTickUnits());//设置Y轴数据为整型
//        ChartUtilities.applyCurrentTheme(chart);                                   //使用当前设置的主题样式
//        return chart;
//    }

    /******************生成时序图********************/
//    private static XYDataset getDataset(){
//        TimeSeriesCollection dataset = new TimeSeriesCollection(); //创建时序图表的数据集合
//        TimeSeries timeSeriesA = new TimeSeries("A股");//A股数据对象
//        TimeSeries timeSeriesB = new TimeSeries("B股");//B股数据对象
//        TimeSeries timeSeriesC = new TimeSeries("C股");//C股数据对象
//        for(int i=1;i<=12;i++){//循环一年的月份
//            timeSeriesA.add(new Month(i,2010),new Random().nextDouble()*9);//向A股对象中添加随机数据
//            timeSeriesB.add(new Month(i,2010),new Random().nextDouble()*8); //向B股对象中添加随机数据
//            timeSeriesC.add(new Month(i,2010),new Random().nextDouble()*6); //向C股对象中添加塑胶数据
//        }
//        dataset.addSeries(timeSeriesA);//将数据对象添加至数据集合
//        dataset.addSeries(timeSeriesB); //将数据对象添加至数据集合
//        dataset.addSeries(timeSeriesC); //将数据对象添加至数据集合
//        return dataset;
//    }
//    public static JFreeChart getTimeSeriesChart(){
//        StandardChartTheme standardChartTheme = new StandardChartTheme("CN");
//        standardChartTheme.setExtraLargeFont(new Font("隶书", Font.BOLD, 24));    // 设置标题字体
//        standardChartTheme.setRegularFont(new Font("宋体", Font.BOLD, 14)); // 设置图例的字体
//        standardChartTheme.setLargeFont(new Font("宋体", Font.BOLD, 18));           // 设置轴向的字体
//        ChartFactory.setChartTheme(standardChartTheme);                                 // 设置主题样式
//        JFreeChart timeChart = ChartFactory.createTimeSeriesChart(
//                "股票价格走势",
//                "月份",
//                "每股价格",
//                getDataset(),
//                true,
//                true,
//                false);
//        //timeChart.setBackgroundPaint(Color.MAGENTA);                   // 设置背景色
//        XYPlot plot = timeChart.getXYPlot();
//        DateFormat format = new SimpleDateFormat("MM月份");        // 创建日期格式对象
//        DateAxis domainAxis = new DateAxis("2010年统计月份");       // 创建时间轴对象
//        DateTickUnit dtu = new DateTickUnit(DateTickUnit.DAY, 29, format);
//        domainAxis.setTickUnit(dtu);                // 设置横轴上的时间刻度的显示格式
//        domainAxis.setLowerMargin(0.0);       // 设置图表空白
//        domainAxis.setUpperMargin(0.0);         // 设置图表空白
//        plot.setDomainAxis(domainAxis);           // 为绘图属性添加横轴对象
//        return timeChart;
//    }


}
