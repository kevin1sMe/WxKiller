local json = require("cjson")

--解析POST参数
ngx.req.read_body()
local arg = ngx.req.get_post_args()
local room_id = arg['room_id']

local wx_qr_code_url = 'https://api.weixin.qq.com/wxa/getwxacodeunlimit'
local wx_token_url = 'https://api.weixin.qq.com/cgi-bin/token'

local appid = 'wx6729b55b5c781c6c'
local appsecret = '20bc3a3a9af9ad778e45d3afad753bd5'

ngx.log(ngx.DEBUG, "room_id:", room_id)


--获取token
local http = require "resty.http" -- ①
local hc = http.new()
local params = {
    grant_type = "client_credential", 
    appid = appid, 
    secret = appsecret
}
local res, err = hc:request_uri(wx_token_url.."?"..ngx.encode_args(params))
if not res then
    ngx.log(ngx.ERR, "request failed, res is nil")
    ngx.exit(ngx.HTTP_OK)
end

if 200 ~= res.status then
    ngx.exit(res.status)
end

local token_rsp = json.decode(res.body)
ngx.log(ngx.DEBUG, "get token:", token_rsp.access_token)
ngx.log(ngx.DEBUG, "get token expires time:", token_rsp.expires_in)

--去获取二维码
qrcode_params = {
    scene = tostring(room_id), 
    --page = "pages/team/team",
    width = 430
} 

local res, err = hc:request_uri( -- ②
    wx_qr_code_url.."?access_token="..token_rsp.access_token,
    {
        method = "POST",
        body = json.encode(qrcode_params), 
        header = {
            ["Content-Type"] = "application/x-www-form-urlencoded",
        }
    }
)

if not res then
    ngx.log(ngx.ERR, "request to create QR code failed, res is nil")
    ngx.exit(ngx.HTTP_OK)
end

ngx.header.content_type="text/html"
if 200 ~= res.status then
    ngx.say(rsp.body)
    ngx.exit(res.status)
else
    ngx.header.content_type="image/png"
    ngx.say(res.body)
end


