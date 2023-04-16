import{_ as l,W as t,X as r,Y as d,Z as n,$ as e,a0 as a,a1 as i,C as c}from"./framework-a4c02b8f.js";const o="/assets/image-20230412180754108-a3aa89d1.png",p="/assets/image-20230412182552776-eed49837.png",v="/assets/image-20230416204817757-2cd25f4e.png",u={},m=n("h1",{id:"nginx学习笔记",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#nginx学习笔记","aria-hidden":"true"},"#"),e(" Nginx学习笔记")],-1),h=n("h2",{id:"常用版本",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#常用版本","aria-hidden":"true"},"#"),e(" 常用版本")],-1),b={href:"http://nginx.org/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.nginx.com",target:"_blank",rel:"noopener noreferrer"},x={href:"http://openresty.org/cn/",target:"_blank",rel:"noopener noreferrer"},k={href:"http://tengine.taobao.org",target:"_blank",rel:"noopener noreferrer"},_=i(`<h2 id="docker安装" tabindex="-1"><a class="header-anchor" href="#docker安装" aria-hidden="true">#</a> Docker安装</h2><p>先创建挂在目录和复制配置</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--name</span> nginx <span class="token parameter variable">-d</span> nginx

<span class="token comment"># 将容器nginx.conf文件复制到宿主机</span>
<span class="token function">docker</span> <span class="token function">cp</span> nginx:/etc/nginx/nginx.conf /mydata/nginx/conf/nginx.conf
<span class="token comment"># 将容器conf.d文件夹下内容复制到宿主机</span>
<span class="token function">docker</span> <span class="token function">cp</span> nginx:/etc/nginx/conf.d /mydata/nginx/conf/conf.d
<span class="token comment"># 将容器中的html文件夹复制到宿主机</span>
<span class="token function">docker</span> <span class="token function">cp</span> nginx:/usr/share/nginx/html /mydata/nginx

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token punctuation">\\</span>
<span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> nginx <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /mydata/nginx/conf/nginx.conf:/etc/nginx/nginx.conf <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /mydata/nginx/conf/conf.d:/etc/nginx/conf.d <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /mydata/nginx/log:/var/log/nginx <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /mydata/nginx/html:/usr/share/nginx/html <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> nginx:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装文件目录" tabindex="-1"><a class="header-anchor" href="#安装文件目录" aria-hidden="true">#</a> 安装文件目录</h2><ul><li><p>conf</p><p>主要存放nginx的配置文件</p></li><li><p>html</p><p>存放一些静态文件</p></li><li><p>logs</p><p>存放nginx 的日志</p></li></ul><h2 id="工作流程" tabindex="-1"><a class="header-anchor" href="#工作流程" aria-hidden="true">#</a> 工作流程</h2><figure><img src="`+o+`" alt="nginx工作流程" tabindex="0" loading="lazy"><figcaption>nginx工作流程</figcaption></figure><h2 id="nginx-conf最小配置" tabindex="-1"><a class="header-anchor" href="#nginx-conf最小配置" aria-hidden="true">#</a> Nginx.conf最小配置</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># nginx启动的时候启动多少个工作进程,基本一个内核对应多少个</span>
worker_processes  auto<span class="token punctuation">;</span>

events <span class="token punctuation">{</span>
    <span class="token comment"># 最大连接数</span>
    worker_connections  <span class="token number">1024</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

http <span class="token punctuation">{</span>
    <span class="token comment"># 引入其他配置文件</span>
    include       /etc/nginx/mime.types<span class="token punctuation">;</span> <span class="token comment"># 该文件记录头类型</span>
    <span class="token comment"># 默认类型，如果不包含在默认的头类型就用这个默认的</span>
    default_type  application/octet-stream<span class="token punctuation">;</span>

    log_format  main  <span class="token string">&#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
                      <span class="token string">&#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span>
                      <span class="token string">&#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;</span><span class="token punctuation">;</span>

    access_log  /var/log/nginx/access.log  main<span class="token punctuation">;</span>
    <span class="token comment"># 数据零拷贝: 不通过应用内存发送文件流</span>
    sendfile        on<span class="token punctuation">;</span>
    <span class="token comment">#tcp_nopush     on;</span>
    <span class="token comment"># 保持长连接的超时时间</span>
    keepalive_timeout  <span class="token number">65</span><span class="token punctuation">;</span>

    <span class="token comment">#gzip  on;</span>
    <span class="token comment"># 虚拟主机</span>
    server <span class="token punctuation">{</span>
        <span class="token comment"># 监听端口</span>
        listen       <span class="token number">80</span><span class="token punctuation">;</span>
        listen  <span class="token punctuation">[</span>::<span class="token punctuation">]</span>:80<span class="token punctuation">;</span>
        <span class="token comment"># 域名、主机名</span>
        server_name  localhost<span class="token punctuation">;</span>
        <span class="token comment"># uri</span>
        location / <span class="token punctuation">{</span>
            <span class="token comment"># 资源的根目录</span>
            root   /usr/share/nginx/html<span class="token punctuation">;</span>
            <span class="token comment"># 默认页</span>
            index  index.html index.htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment"># 错误码转发到地址</span>
        error_page   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html<span class="token punctuation">;</span>
        location <span class="token operator">=</span> /50x.html <span class="token punctuation">{</span>
            root   /usr/share/nginx/html<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="虚拟主机" tabindex="-1"><a class="header-anchor" href="#虚拟主机" aria-hidden="true">#</a> 虚拟主机</h2><figure><img src="`+p+'" alt="浏览器访问页面流程" tabindex="0" loading="lazy"><figcaption>浏览器访问页面流程</figcaption></figure><h3 id="域名解析" tabindex="-1"><a class="header-anchor" href="#域名解析" aria-hidden="true">#</a> 域名解析</h3><p>解析的就是将域名与IP进行绑定映射。</p><h4 id="解析方式" tabindex="-1"><a class="header-anchor" href="#解析方式" aria-hidden="true">#</a> 解析方式</h4><p>A： 将域名匹配一个IPV4的地址。（常用）</p><p>CNAME： 将域名指向到另外的一个域名（常用）</p><p>AAA：将域名指向一个IPV6的地址</p><p>...</p><h3 id="servername匹配规则" tabindex="-1"><a class="header-anchor" href="#servername匹配规则" aria-hidden="true">#</a> ServerName匹配规则</h3><p><strong>server块匹配是按照顺序的，如果前一个匹配上了，就不会匹配后面的了</strong></p><p>server_name编写规则：</p>',22),f=n("li",null,[n("p",null,"完整匹配"),n("p",null,"server_name h1,h2;")],-1),w=n("li",null,[n("p",null,"通配符匹配"),n("p",null,"*号匹配：server_name *.xxx.com")],-1),y=n("p",null,"通配符结束匹配",-1),N={href:"http://www.xxx",target:"_blank",rel:"noopener noreferrer"},$=n("li",null,[n("p",null,"正则匹配"),n("p",null,[e("server_name ~"),n("sup",{class:"footnote-ref"},[n("a",{href:"#footnote1"},"[1]"),n("a",{class:"footnote-anchor",id:"footnote-ref1"})]),e("+.xxx.com$;")])],-1),q=i(`<h2 id="反向代理" tabindex="-1"><a class="header-anchor" href="#反向代理" aria-hidden="true">#</a> 反向代理</h2><h3 id="proxy-pass" tabindex="-1"><a class="header-anchor" href="#proxy-pass" aria-hidden="true">#</a> proxy_pass</h3><p>示例:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;
    location / {
        proxy_pass http://www.atguigu.com;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意:</p><p>proxy_pass 里面不能代理https</p><h2 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h2><h3 id="upstream" tabindex="-1"><a class="header-anchor" href="#upstream" aria-hidden="true">#</a> upstream</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream httpds{
 server 代理1;
 server 代理2;
 server 代理3;
}
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;
    location / {
        proxy_pass httpds;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="负载策略" tabindex="-1"><a class="header-anchor" href="#负载策略" aria-hidden="true">#</a> 负载策略</h3><ul><li><p>轮询：一台机器一次</p></li><li><p>权重：根据权重来判断代理到哪台服务器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream httpds{
 server 代理1 weight=8 down; # down 表示该机器不参与负载均衡
 server 代理2 weight=5; 
 server 代理3 weight=1 backup;# backup 表示正常情况下不会负载到该台机器，只有当没有机器能够使用才会负载到这台机器
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>ip_hash</p><p>根据客户端的ip的地址判断负载到某一台固定的机器，可以保持会话</p></li><li><p>least_conn</p><p>最少连接访问，多给最少的机器连接</p></li><li><p>url_hash</p><p>根据用户访问的url定向转发请求【需要加载附加组件才可以实现】</p></li><li><p>fair</p><p>根据后端服务器响应时间转发请求【需要加载附加组件才可以实现】</p></li></ul><h2 id="动静分离" tabindex="-1"><a class="header-anchor" href="#动静分离" aria-hidden="true">#</a> 动静分离</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    server {
        listen       80;
        server_name  localhost;
        location / {
	    proxy_pass http://192.168.73.203:8080;
        }
        location ~*/(js|css|images) {
	    root html;
	    index index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="urlrewirte伪静态配置" tabindex="-1"><a class="header-anchor" href="#urlrewirte伪静态配置" aria-hidden="true">#</a> URLRewirte伪静态配置</h2><h3 id="rewrite" tabindex="-1"><a class="header-anchor" href="#rewrite" aria-hidden="true">#</a> rewrite</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;
    location / {
        rewrite ^/.html$ /index.jsp?pageNum=2 break;
        proxy_pass http://www.atguigu.com;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="命令形式" tabindex="-1"><a class="header-anchor" href="#命令形式" aria-hidden="true">#</a> 命令形式：</h3><figure><img src="`+v+`" alt="格式" tabindex="0" loading="lazy"><figcaption>格式</figcaption></figure><h2 id="防盗链" tabindex="-1"><a class="header-anchor" href="#防盗链" aria-hidden="true">#</a> 防盗链</h2><h3 id="valid-refers" tabindex="-1"><a class="header-anchor" href="#valid-refers" aria-hidden="true">#</a> valid_refers</h3><p>检测来源网址</p><h2 id="高可用配置" tabindex="-1"><a class="header-anchor" href="#高可用配置" aria-hidden="true">#</a> 高可用配置</h2><h3 id="运用keepalived-实现" tabindex="-1"><a class="header-anchor" href="#运用keepalived-实现" aria-hidden="true">#</a> 运用keepalived 实现</h3><h4 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> keepalived
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装完成后配置文件在 /etc/keepalived/keepalived.conf</p><h4 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">!</span> Configuration File <span class="token keyword">for</span> keepalived
<span class="token comment">#Keepalived配置文件</span>
global_defs <span class="token punctuation">{</span>
        router_id NodeA                 <span class="token comment">#路由ID, 主备的ID不能相同</span>
<span class="token punctuation">}</span>
<span class="token comment">#自定义监控脚本</span>
vrrp_script chk_haproxy <span class="token punctuation">{</span>
        script <span class="token string">&quot;/etc/keepalived/check_haproxy.sh&quot;</span>
        interval <span class="token number">5</span>
        weight <span class="token number">2</span>
<span class="token punctuation">}</span>
vrrp_instance VI_1 <span class="token punctuation">{</span>
        state MASTER <span class="token comment">#Keepalived的角色。Master表示主服务器，从服务器设置为BACKUP</span>
        interface eth0          <span class="token comment">#指定监测网卡</span>
        virtual_router_id <span class="token number">1</span>
        priority <span class="token number">100</span>            <span class="token comment">#优先级，BACKUP机器上的优先级要小于这个值</span>
        advert_int <span class="token number">1</span>            <span class="token comment">#设置主备之间的检查时间，单位为s</span>
        authentication <span class="token punctuation">{</span>        <span class="token comment">#定义验证类型和密码</span>
                auth_type PASS
                auth_pass root123
        <span class="token punctuation">}</span>
        track_script <span class="token punctuation">{</span>
                chk_haproxy
        <span class="token punctuation">}</span>
        virtual_ipaddress <span class="token punctuation">{</span>     <span class="token comment">#VIP地址，可以设置多个：</span>
                <span class="token number">1.117</span>.149.141
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="https-证书" tabindex="-1"><a class="header-anchor" href="#https-证书" aria-hidden="true">#</a> Https 证书</h2><p>// todo</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
   listen 443 ssl;
   server_name 域名;
   ssl_certificate pem文件地址;
   ssl_certificate_key key文件地址;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr class="footnotes-sep"><section class="footnotes"><ol class="footnotes-list"><li id="footnote1" class="footnote-item"><p>0-9 <a href="#footnote-ref1" class="footnote-backref">↩︎</a></p></li></ol></section>`,33);function A(I,V){const s=c("ExternalLinkIcon");return t(),r("div",null,[d(" more "),m,h,n("p",null,[e("Nginx开源版（官方免费开源版本） "),n("a",b,[e("http://nginx.org/"),a(s)])]),n("p",null,[e("Nginx plus 商业版（付费版，在上版本基础上加了一些功能） "),n("a",g,[e("https://www.nginx.com"),a(s)])]),n("p",null,[e("openresty（nginx+lua完美整合） "),n("a",x,[e("http://openresty.org/cn/"),a(s)])]),n("p",null,[e("Tengine（淘宝网公布发行版本，免费开源） "),n("a",k,[e("http://tengine.taobao.org"),a(s)])]),_,n("ul",null,[f,w,n("li",null,[y,n("p",null,[e("server_name "),n("a",N,[e("www.xxx"),a(s)]),e(".*")])]),$]),q])}const P=l(u,[["render",A],["__file","Nginx.html.vue"]]);export{P as default};
